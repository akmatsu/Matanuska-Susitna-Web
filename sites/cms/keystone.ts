// Welcome to Keystone!
//
// This file is what Keystone uses as the entry-point to your headless backend
//
// Keystone imports the default export of this file, expecting a Keystone configuration object
//   you can find out more at https://keystonejs.com/docs/apis/config

import { config } from '@keystone-6/core';

// to keep this file tidy, we define our schema in a different file
import { lists } from './schema';

// authentately*  here too, but you might move this elsewhere
// when you write your list-level accication is configured separess control functions, as they typically rely on session data
import { withAuth, session } from './auth';
import { appConfig } from './appConfig';

export default withAuth(
  config({
    db: {
      // we're using sqlite for the fastest startup experience
      //   for more information on what database might be appropriate for you
      //   see https://keystonejs.com/docs/guides/choosing-a-database#title
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
    server: {
      cors: {
        origin: [appConfig.server.originHost],
        credentials: true,
        methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS', 'PATCH'],
      },
      port: appConfig.server.port,
    },

    ui: {},

    lists,
    session,
    telemetry: false,
  }),
);
