import { Router } from 'express';

import cookieParser from 'cookie-parser';
import { statelessSessions } from '@keystone-6/core/session';
import { type KeystoneContext } from '@keystone-6/core/types';

import { Passport } from 'passport';
import { type VerifyCallback } from 'passport-oauth2';
import {
  OIDCStrategy,
  IProfile,
  IOIDCStrategyOptionWithRequest,
} from 'passport-azure-ad';

import { type User as PrismaUser } from '.prisma/client';
import { type TypeInfo } from '.keystone/types';

export type Session = PrismaUser;

export const session = statelessSessions<Session>({
  maxAge: 60 * 60 * 24 * 30,
  secret: process.env.SESSION_SECRET!,
});

declare global {
  namespace Express {
    // Augment the global user added by Passport to be the same as the Prisma Author
    interface User extends PrismaUser {}
  }
}

const options: IOIDCStrategyOptionWithRequest = {
  identityMetadata: `https://login.microsoftonline.com/${process.env.AD_TENANT_ID}/v2.0/.well-known/openid-configuration`,
  clientID: process.env.AD_CLIENT_ID!,
  clientSecret: process.env.AD_CLIENT_SECRET_ID!,
  responseType: 'code',
  responseMode: 'query',
  redirectUrl: 'http://localhost:3333/auth/azure/callback',
  allowHttpForRedirectUrl: true, // Use HTTPS in production
  scope: ['openid', 'profile', 'email'],
  loggingLevel: 'warn',
  passReqToCallback: true,

  nonceLifetime: 600,
  nonceMaxAmount: 5,
  useCookieInsteadOfSession: true,
  cookieEncryptionKeys: [
    { key: '12345678901234567890123456789012', iv: '123456789012' },
  ],
};

export function passportMiddleware(
  commonContext: KeystoneContext<TypeInfo<Session>>,
): Router {
  const router = Router();
  const instance = new Passport();

  router.use(cookieParser());

  const strategy = new OIDCStrategy(
    options,
    async (
      req: Express.Request,
      _iss: string,
      _sub: string,
      profile: IProfile,
      _accessToken: string,
      _refreshToken: string,
      done: VerifyCallback,
    ) => {
      console.log('OIDC Strategy invoked');
      try {
        const email = profile._json?.email || profile.emails?.[0]?.value;
        if (!email) {
          console.log('No email found in the profile!');
          return done(new Error('No email found in the profile.'));
        }

        console.log('email: ', email);
        console.log('OID: ', profile.oid);

        const user = await commonContext.prisma.user.upsert({
          where: { authId: profile.oid },
          update: { name: profile.displayName, email },
          create: { authId: profile.oid, name: profile.displayName, email },
        });

        console.log('user upserted: ', user);

        return done(null, user);
      } catch (error) {
        console.log('Error, during user upsert: ', error);
        return done(error);
      }
    },
  );

  instance.use(strategy);

  router.get(
    '/auth/azure',
    (req, res, next) => {
      console.log('Request to /auth/azure');
      next();
    },
    instance.authenticate('azuread-openidconnect', {
      session: false,
      failureRedirect: '/',
      failWithError: true,
    }),
  );
  router.get(
    '/auth/azure/callback',
    (req, res, next) => {
      console.log('Callback route hit');

      next();
    },
    instance.authenticate('azuread-openidconnect', {
      session: false,
      failureRedirect: '/auth/unauthorized',
    }),
    async (req, res) => {
      console.log('Callback successful');
      if (!req.user) {
        console.log('No user in the request.');
        res.status(401).send('Authentication failed');
        return;
      }

      const context = await commonContext.withRequest(req, res);

      // Starts the session, and sets the cookie on context.res
      await context.sessionStrategy?.start({
        context,
        data: req.user,
      });

      res.redirect('/auth/session');
    },
  );

  // Show the current session object
  //   WARNING: this is for demonstration purposes only, probably don't do this
  router.get('/auth/session', async (req, res) => {
    console.log('Request to /auth/session');
    console.log('Session:', req.session);
    console.log('Session ID:', req.sessionID);

    const context = await commonContext.withRequest(req, res);
    const session = await context.sessionStrategy?.get({ context });

    console.log('Keystone session:', session);

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(session));
    res.end();
  });

  router.get('/auth/unauthorized', (req, res) => {
    console.log('Unauthorized access detected');

    res.status(401).send();
  });

  return router;
}
