// Keystone config docs: https://keystonejs.com/docs/apis/config
import { config } from '@keystone-6/core';
import { lists } from './src/app';
import { TypeInfo } from '.keystone/types';
import { appConfig } from './src/configs/appConfig';
import {
  type Session,
  passportMiddleware,
  setupAzureADClient,
  session,
} from './src/auth';
import {
  COLLECTIONS,
  TYPESENSE_CLIENT,
  TYPESENSE_COLLECTIONS,
} from './src/utils/typesense';
import { json } from 'express';
import { serviceToSearchableObj } from './src/app/models/Service';
import { toSearchableObj } from './src/app/models/Community';
import { orgUnitToSearchableObj } from './src/app/models/OrgUnit';

export default config<TypeInfo<Session>>({
  // https://keystonejs.com/docs/config/config#db
  db: {
    provider: appConfig.database.provider,
    url: `${appConfig.database.protocol}://${appConfig.database.user}:${appConfig.database.password}@${appConfig.database.host}:${appConfig.database.port}/${appConfig.database.name}`,
    extendPrismaSchema(schema) {
      return schema.replace(
        `generator client {`,
        `generator client {
            binaryTargets = ["native", "rhel-openssl-3.0.x", "debian-openssl-3.0.x"]`,
      );
    },
  },

  // https://keystonejs.com/docs/config/lists
  lists,

  // https://keystonejs.com/docs/config/config#server
  server: {
    cors: {
      origin: ['*'],
      credentials: true,
      methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS', 'PATCH'],
    },
    maxFileSize: 500 * 1024 * 124,
    async extendExpressApp(app, commonContext) {
      await setupAzureADClient();
      app.use(passportMiddleware(commonContext));
      app.use(json());
      app.post('/typesense/create-collections', async (req, res) => {
        try {
          await Promise.all(
            COLLECTIONS.map(async (collection) => {
              const exists = await TYPESENSE_CLIENT.collections(
                collection.name,
              ).exists();
              if (!exists) {
                await TYPESENSE_CLIENT.collections().create(collection);
                console.log(
                  `Collection ${collection.name} created successfully`,
                );
              } else {
                console.log(
                  `Collection ${collection.name} already exists. Skipping...`,
                );
              }
            }),
          );
          console.log('Finished creating collections.');

          return res.status(200).json({ message: 'Collections created.' });
        } catch (error: any) {
          return res.status(500).json(error);
        }
      });
      app.post('/typesense/remove-collection', async (req, res) => {
        try {
          const collection: string = req.body.collection;

          if (!collection) {
            return res
              .status(400)
              .json({ message: 'Collection name is required' });
          }

          if (!(await TYPESENSE_CLIENT.collections(collection).exists())) {
            return res
              .status(404)
              .json({ message: `Collection ${collection} does not exist.` });
          }

          await TYPESENSE_CLIENT.collections(collection).delete();

          return res
            .status(204)
            .json({ message: `Collection ${collection} removed successfully` });
        } catch (error: any) {
          return res.status(500).json(error);
        }
      });
      app.post('/typesense/import-services', async (_, res) => {
        try {
          const services = await commonContext.prisma.service.findMany({
            select: {
              id: true,
              title: true,
              slug: true,
              description: true,
              body: true,
              actionLabel: true,
              publishAt: true,
              tags: {
                select: {
                  name: true,
                },
              },
            },
          });
          const formatted = services.map((service: any) =>
            serviceToSearchableObj(service),
          );

          await TYPESENSE_CLIENT.collections(TYPESENSE_COLLECTIONS.PAGES)
            .documents()
            .import(formatted, { action: 'upsert' });
          return res.status(200).json({ message: 'Services imported.' });
        } catch (error: any) {
          return res.status(500).json(error);
        }
      });
      app.post('/typesense/import-communities', async (_, res) => {
        try {
          const communities = await commonContext.prisma.community.findMany({
            select: {
              id: true,
              title: true,
              slug: true,
              description: true,
              publishAt: true,
              districts: {
                select: {
                  title: true,
                },
              },
              tags: {
                select: {
                  name: true,
                },
              },
            },
          });

          const formatted = communities.map((service: any) =>
            toSearchableObj(service),
          );

          await TYPESENSE_CLIENT.collections(TYPESENSE_COLLECTIONS.PAGES)
            .documents()
            .import(formatted, { action: 'upsert' });
          return res.status(200).json({ message: 'Communities imported.' });
        } catch (error: any) {
          return res.status(500).json(error);
        }
      });
      app.post('/typesense/import-departments', async (_, res) => {
        try {
          const departments = await commonContext.prisma.orgUnit.findMany({
            select: {
              id: true,
              title: true,
              slug: true,
              description: true,
              tags: {
                select: {
                  name: true,
                },
              },
            },
          });

          const formatted = departments.map((department: any) =>
            orgUnitToSearchableObj(department),
          );

          await TYPESENSE_CLIENT.collections(TYPESENSE_COLLECTIONS.PAGES)
            .documents()
            .import(formatted, { action: 'upsert' });
          return res.status(200).json({ message: 'Departments imported.' });
        } catch (error: any) {
          return res.status(500).json(error);
        }
      });
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
    async pageMiddleware({ wasAccessAllowed, context }) {
      if (wasAccessAllowed) {
        const user = await context.prisma.user.findUnique({
          where: { id: context.session?.id },
        });

        if (user) {
          context.sessionStrategy?.start({
            context,
            data: user,
          });
          return;
        }
      } else {
        return {
          kind: 'redirect',
          to: '/auth/azure',
        };
      }
    },
  },
});
