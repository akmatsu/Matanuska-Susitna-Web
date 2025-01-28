import { serviceToSearchableObj } from '../schema/models/Service';
import { TYPESENSE_CLIENT, TYPESENSE_COLLECTIONS } from '../typesense';
import { getContext } from '@keystone-6/core/context';
import config from '../keystone';
import * as PrismaModule from '.prisma/client';

async function importServices() {
  const context = getContext(config, PrismaModule);

  console.log('Fetching services...');
  const services = await context.prisma.service.findMany({
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
  console.log('Services found:', services.length);

  console.log('Formatting Services...');
  const formatted = services.map((service: any) =>
    serviceToSearchableObj(service),
  );

  console.log('Importing services to Typesense...');
  await TYPESENSE_CLIENT.collections(TYPESENSE_COLLECTIONS.PAGES)
    .documents()
    .import(formatted, { action: 'upsert' });

  console.log('Services imported successfully.');
}

importServices();
