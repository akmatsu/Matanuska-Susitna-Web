import 'dotenv/config';
import { DatabaseProvider, StorageConfig } from '@keystone-6/core/types';
export const baseURL = 'http://localhost:3333';

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
  storage: {
    s3Documents: {
      kind: 's3',
      type: 'file',
    } as StorageConfig,
    s3Images: {
      kind: 's3',
      type: 'image',
    } as StorageConfig,
    localDocuments: {
      kind: 'local',
      type: 'file',
      generateUrl: (path) => `${baseURL}/document-files${path}`,
      serverRoute: { path: '/document-files' },
      storagePath: 'public/document-files',
    } as StorageConfig,
    localImages: {
      kind: 'local',
      type: 'image',
      generateUrl: (path) => `${baseURL}/image-files${path}`,
      serverRoute: { path: '/image-files' },
      storagePath: 'public/image-files',
    } as StorageConfig,
  },
};
