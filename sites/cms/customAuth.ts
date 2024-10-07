import { Router } from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { statelessSessions } from '@keystone-6/core/session';
import { type KeystoneContext } from '@keystone-6/core/types';

import { Passport } from 'passport';
import {
  BaseClient,
  Issuer,
  Strategy as OpenIDConnectStrategy,
} from 'openid-client';

import { type User as PrismaUser } from '.prisma/client';
import { type TypeInfo } from '.keystone/types';

export type Session = PrismaUser;

export const sessionConfig = statelessSessions<Session>({
  maxAge: 60 * 60 * 24 * 30,
  secret: process.env.SESSION_SECRET!,
});

declare global {
  namespace Express {
    interface User extends PrismaUser {}
  }
}

// Global client variable
let azureADClient: BaseClient;

const setupAzureADClient = async () => {
  const issuer = await Issuer.discover(
    `https://login.microsoftonline.com/${process.env.AD_TENANT_ID}/v2.0`,
  );
  azureADClient = new issuer.Client({
    client_id: process.env.AD_CLIENT_ID!,
    client_secret: process.env.AD_CLIENT_SECRET!,
    redirect_uris: ['http://localhost:3333/auth/azure/callback'],
    response_types: ['code'],
  });
};

setupAzureADClient().catch((err) => {
  console.error('Error setting up Azure AD Client:', err);
});

export function passportMiddleware(
  commonContext: KeystoneContext<TypeInfo<Session>>,
): Router {
  const router = Router();
  const instance = new Passport();

  router.use(cookieParser());
  router.use(
    session({
      secret: process.env.SESSION_SECRET!,
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false },
    }),
  );

  // Define serialization and deserialization logic
  instance.serializeUser((user, done) => {
    done(null, user.id); // Serialize user by ID (or another identifier)
  });

  instance.deserializeUser(async (id: any, done) => {
    try {
      const user = await commonContext.prisma.user.findUnique({
        where: { id: id },
      });
      done(null, user);
    } catch (error) {
      done(error);
    }
  });

  if (!azureADClient) {
    throw new Error(
      'Azure AD Client is not set up. Make sure `setupAzureADClient` is called before initializing middleware.',
    );
  }

  const strategy = new OpenIDConnectStrategy(
    {
      client: azureADClient,
      params: {
        scope: 'openid profile email',
        response_mode: 'query',
      },
      passReqToCallback: true,
    },
    async (req, tokenSet, userInfo, done) => {
      try {
        const email = userInfo.email || userInfo.preferred_username;
        if (!email) {
          return done(new Error('No email found in the profile.'));
        }

        const user = await commonContext.prisma.user.upsert({
          where: { authId: userInfo.sub },
          update: { name: userInfo.name, email },
          create: {
            authId: userInfo.sub,
            name: userInfo.name,
            email,
            password: 'PLACEHOLDER_PASSWORD',
          },
        });

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    },
  );

  instance.use('openid-client', strategy);

  router.get('/auth/azure', instance.authenticate('openid-client'));

  router.get(
    '/auth/azure/callback',
    instance.authenticate('openid-client', {
      failureRedirect: '/auth/unauthorized',
    }),
    async (req, res) => {
      if (!req.user) {
        return res.status(401).send('Authentication failed');
      }

      const context = await commonContext.withRequest(req, res);

      await context.sessionStrategy?.start({
        context,
        data: req.user,
      });

      res.redirect('/');
    },
  );

  router.get('/auth/unauthorized', (req, res) => {
    res.status(401).send('Unauthorized!');
  });

  return router;
}
