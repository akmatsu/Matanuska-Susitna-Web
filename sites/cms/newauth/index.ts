import { storedSessions } from '@keystone-6/core/session';
import { type User as PrismaUser } from '.prisma/client';
import { Router } from 'express';
import { BaseClient, Issuer } from 'openid-client';
import { KeystoneContext } from '@keystone-6/core/types';
import { type TypeInfo } from '.keystone/types';

export type Session = {
  data: PrismaUser;
};

declare global {
  namespace Express {
    interface User extends PrismaUser {}
  }
}

let azureAdClient: BaseClient;

export const session = storedSessions<Session>({
  store() {
    return {
      get(key) {
        console.log(key);
      },
      delete(key) {
        console.log(key);
      },
      set(key, value) {
        console.log(key, value);
      },
    };
  },
  secret: process.env.SESSION_SECRET!,
  maxAge: 60 * 60 * 8,
});

export async function setupAzureADClient() {
  try {
    const issuer = await Issuer.discover(
      `https://login.microsoftonline.com/${process.env.AD_TENANT_ID}/v2.0`,
    );

    azureAdClient = new issuer.Client({
      client_id: process.env.AD_CLIENT_ID!,
      client_secret: process.env.AD_CLIENT_SECRET!,
      redirect_uris: [`${process.env.AD_REDIRECT_HOST}/auth/azure/callback`],
      response_types: ['code'],
    });

    azureAdClient.stateStore;
  } catch (err) {
    console.error('Error occurred while setting up Azure AD Client: ', err);
  }
}

export function authRouter(commonContext: KeystoneContext<TypeInfo<Session>>) {
  const router = Router();

  // router.get('/auth/azure', instance.authenticate('openid-client'));
  router.get('/auth/azure', (req, res) => {
    const url = azureAdClient.authorizationUrl({
      scope: 'openid profile email',
      response_mode: 'query',
    });
    res.redirect(url);
  });

  router.get('/auth/azure/callback', async (req, res) => {
    try {
      const params = azureAdClient.callbackParams(req);
      const tokenSet = await azureAdClient.callback(
        `${process.env.AD_REDIRECT_HOST}/auth/azure/callback`,
        params,
      );
      const userInfo = await azureAdClient.userinfo(tokenSet.access_token!);
      const email = userInfo.email || userInfo.preferred_username;
      if (!email) {
        return res.status(400).send('No email found in the profile');
      }

      const user = await commonContext.prisma.user.upsert({
        where: { id: userInfo.sub },
        update: { name: userInfo.name, email },
        create: {
          authId: userInfo.sub,
          name: userInfo.name,
          email,
        },
      });

      const context = await commonContext.withRequest(req, res);
      await context.sessionStrategy?.start({
        context,
        data: { data: user },
      });
      res.redirect('/');
    } catch (err) {
      console.error('Authorization error: ', err);
      res.status(500).send('Authentication failed');
    }
  });

  return router;
}
