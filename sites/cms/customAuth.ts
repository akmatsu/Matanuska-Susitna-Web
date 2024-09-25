import { statelessSessions } from '@keystone-6/core/session';
import { type KeystoneContext } from '@keystone-6/core/types';
import { Router } from 'express';
import { Passport } from 'passport';

export const session = statelessSessions({
  maxAge: 60 * 60 * 24 * 30,
  secret: process.env.SESSION_SECRET,
});

export function passportMiddleware(commonContext: KeystoneContext) {
  const router = Router();
  const instance = new Passport();
}
