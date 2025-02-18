import { list, ListConfig } from '@keystone-6/core';
import {
  contacts,
  liveUrl,
  owner,
  services,
  slug,
  tags,
  timestamps,
  titleAndDescription,
} from '../fieldUtils';
import { generalItemAccess, generalOperationAccess } from '../access';
import { checkbox, relationship } from '@keystone-6/core/fields';
import { blueHarvestImage } from '../../components/customFields/blueHarvestImage';
import {
  TYPESENSE_CLIENT,
  TYPESENSE_COLLECTIONS,
  TypeSensePageDocument,
} from '../../utils/typesense';

export function orgUnitToSearchableObj(item: any): TypeSensePageDocument {
  return {
    id: item.id,
    title: item.title,
    slug: item.slug,
    description: item.description,
    type: 'department',
    tags: item.tags.map((tag: { name: string }) => tag?.name || ''),
    published_at: item.publishAt
      ? Math.floor(new Date(item.publishAt).getTime() / 1000)
      : Math.floor(new Date().getTime() / 1000),
  };
}

export const OrgUnit: ListConfig<any> = list({
  access: {
    operation: generalOperationAccess,
    item: generalItemAccess,
  },
  fields: {
    heroImage: blueHarvestImage(),
    ...titleAndDescription(),
    liveUrl: liveUrl('departments'),
    slug,
    owner,
    showPage: checkbox({
      defaultValue: true,
      ui: { itemView: { fieldPosition: 'sidebar' } },
    }),
    tags: tags('orgUnits'),
    contacts: contacts('orgUnits'),
    services: services('orgUnits'),
    children: relationship({ ref: 'OrgUnit.parent', many: true }),
    parent: relationship({ ref: 'OrgUnit.children', many: false }),
    ...timestamps,
  },
  hooks: {
    async afterOperation({ operation, item, context }) {
      if (operation === 'create' || operation === 'update') {
        try {
          const orgUnit = await context.query.OrgUnit.findOne({
            where: { id: item.id.toString() },
            query: 'id title description slug tags { name }',
          });
          const document = orgUnitToSearchableObj(orgUnit);
          await TYPESENSE_CLIENT.collections(TYPESENSE_COLLECTIONS.PAGES)
            .documents()
            .upsert(document);
        } catch (e: any) {
          console.error('Error updating typesense document: ', e);
        }
      }
    },
  },
});
