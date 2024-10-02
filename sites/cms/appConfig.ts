import 'dotenv/config';
import { DatabaseProvider } from '@keystone-6/core/types';

export const appConfig = {
  database: {
    provider: (process.env.DATABASE_PROVIDER as DatabaseProvider) ?? 'sqlite',
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    name: process.env.DATABASE,
    protocol: process.env.DATABASE_PROTOCOL,
  },
  server: {
    port: process.env.WEB_PORT ? parseInt(process.env.WEB_PORT) : 3333,
    originHost: process.env.ORIGIN_HOST,
  },
};
