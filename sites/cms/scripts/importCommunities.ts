import config from '../keystone';
import * as PrismaModule from '.prisma/client';
import { getContext } from '@keystone-6/core/context';
import { TYPESENSE_CLIENT, TYPESENSE_COLLECTIONS } from '../typesense';
import { toSearchableObj } from '../schema/models/Community';

async function importCommunities() {
  const context = getContext(config, PrismaModule);

  console.log('Fetching communities...');
  const communities = await context.prisma.community.findMany({
    select: {
      id: true,
      title: true,
      slug: true,
      description: true,
      publishAt: true,
      tags: {
        select: {
          name: true,
        },
      },
      districts: {
        select: {
          title: true,
        },
      },
    },
  });
  console.log('Communities found:', communities.length);

  console.log('Formatting Communities...');
  const formatted = communities.map((c: any) => toSearchableObj(c));

  console.log('Importing communities to Typesense...');
  await TYPESENSE_CLIENT.collections(TYPESENSE_COLLECTIONS.PAGES)
    .documents()
    .import(formatted, { action: 'upsert' });

  console.log('Communities imported successfully.');
}

importCommunities();
