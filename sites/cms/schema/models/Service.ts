import { list, ListConfig } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { relationship } from '@keystone-6/core/fields';
import {
  pageContentEditor,
  publishable,
  slug,
  timestamps,
  titleAndDescription,
} from '../fieldUtils';
import { customText } from '../../customFields';

export const Service: ListConfig<any> = list({
  access: allowAll,
  graphql: {
    maxTake: 100,
  },
  fields: {
    ...titleAndDescription(),
    ...publishable,
    slug,
    body: customText(),
    ...pageContentEditor,
    processes: relationship({
      ref: 'Process.service',
      many: true,
      isOrderable: true,
      ui: {
        displayMode: 'cards',
        cardFields: ['name'],
        linkToItem: true,
        removeMode: 'none',
        inlineCreate: { fields: ['name'] },
      },
    }),
    tags: relationship({
      ref: 'Tag.services',
      many: true,
      ui: {
        displayMode: 'cards',
        cardFields: ['name'],
        itemView: {
          fieldPosition: 'sidebar',
        },
        inlineCreate: { fields: ['name'] },
        inlineEdit: { fields: ['name'] },
      },
    }),
    ...timestamps,
  },
});
