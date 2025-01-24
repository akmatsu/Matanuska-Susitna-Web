import { list, ListConfig } from '@keystone-6/core';
import {
  filterByPubDates,
  generalItemAccess,
  generalOperationAccess,
} from '../access';
import {
  contacts,
  liveUrl,
  owner,
  publishable,
  services,
  slug,
  tags,
  timestamps,
  titleAndDescription,
  userGroups,
} from '../fieldUtils';
import { relationship, text } from '@keystone-6/core/fields';
import { blueHarvestImage } from '../../customFields/blueHarvestImage';
import { TYPESENSE_CLIENT, TYPESENSE_COLLECTIONS } from '../../typesense';

/*
TODO: Fields to add
Topics
Department(s)?
Assembly District
  District Rep (bio? contact?)
Related Legislation
Boards
Related District(s)
RSA(s)
FSA(s)
SSA(s)
SPUD(s)
*/

const pluralFieldKey = 'communities';

export function toSearchableObj(item: any) {
  return {
    id: item.id,
    title: item.title || '',
    description: item.description || '',
    slug: item.slug || '',
    publish_at: item.publishAt || 0,
    tags: item.tags.map((tag: { name: string }) => tag.name || ''),
    districts: item.districts.map(
      (district: { title: string }) => district.title || '',
    ),
  };
}

export const Community: ListConfig<any> = list({
  access: {
    operation: generalOperationAccess,
    item: generalItemAccess,
    filter: filterByPubDates,
  },
  graphql: {
    maxTake: 100,
  },
  fields: {
    heroImage: blueHarvestImage(),
    ...titleAndDescription(),
    ...publishable,
    liveUrl: liveUrl(pluralFieldKey),
    slug,
    owner,
    mapId: text({
      label: 'Map ID',
      ui: {
        itemView: {
          fieldPosition: 'sidebar',
        },
      },
    }),
    tags: tags(pluralFieldKey),
    userGroups: userGroups(pluralFieldKey),
    contacts: contacts(pluralFieldKey),
    services: services(pluralFieldKey),
    districts: relationship({
      ref: 'AssemblyDistrict',
      many: true,
      ui: {
        hideCreate: true,
        inlineConnect: true,
      },
    }),
    ...timestamps,
  },
  hooks: {
    async beforeOperation({ operation, item, context }) {
      if (operation === 'delete') {
        try {
          await TYPESENSE_CLIENT.collections(TYPESENSE_COLLECTIONS.COMMUNITIES)
            .documents(item.id.toString())
            .delete();
        } catch (error) {
          console.error('Error deleting from Typesense index:', error);
        }
      }
    },

    async afterOperation({ operation, item, context }) {
      if (operation === 'create' || operation === 'update') {
        try {
          const service = await context.prisma.community.findOne({
            where: { id: item.id },
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
          const formatted = toSearchableObj(service);
          await TYPESENSE_CLIENT.collections(TYPESENSE_COLLECTIONS.COMMUNITIES)
            .documents()
            .upsert(formatted);
        } catch (error) {
          console.error('Error updating Typesense index:', error);
        }
      }
    },
  },
});
