// Keystone config docs: https://keystonejs.com/docs/apis/config
import { config } from '@keystone-6/core';
import { lists } from './schema';
import { TypeInfo } from '.keystone/types';
import { appConfig } from './appConfig';
import {
  type Session,
  passportMiddleware,
  setupAzureADClient,
  session,
} from './auth';

export default config<TypeInfo<Session>>({
  // https://keystonejs.com/docs/config/config#db
  db: {
    provider: appConfig.database.provider,
    url: `${appConfig.database.protocol}://${appConfig.database.user}:${appConfig.database.password}@${appConfig.database.host}:${appConfig.database.port}/${appConfig.database.name}`,
    extendPrismaSchema(schema) {
      return schema.replace(
        `generator client {`,
        `generator client {
            binaryTargets = ["native", "rhel-openssl-3.0.x"]`,
      );
    },
  },

  // https://keystonejs.com/docs/config/lists
  lists,

  // https://keystonejs.com/docs/config/config#server
  server: {
    cors: {
      origin: [appConfig.server.originHost],
      credentials: true,
      methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS', 'PATCH'],
    },
    async extendExpressApp(app, context) {
      await setupAzureADClient();
      app.use(passportMiddleware(context));
    },
    port: appConfig.server.port,
  },

  // https://keystonejs.com/docs/config/session
  session,

  // https://keystonejs.com/docs/guides/images-and-files
  storage: appConfig.storage,

  // https://keystonejs.com/docs/reference/telemetry#how-to-opt-out
  telemetry: false,

  // https://keystonejs.com/docs/config/config#ui
  ui: {
    async pageMiddleware({ wasAccessAllowed }) {
      if (!wasAccessAllowed) {
        return {
          kind: 'redirect',
          to: '/auth/azure',
        };
      }
    },
  },
});
