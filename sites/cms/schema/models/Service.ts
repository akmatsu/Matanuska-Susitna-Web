import { list, ListConfig } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { relationship } from '@keystone-6/core/fields';
import {
  pageContentEditor,
  publishable,
  timestamps,
  titleAndDescription,
} from '../fieldUtils';

export const Service: ListConfig<any> = list({
  access: allowAll,
  fields: {
    ...titleAndDescription(),
    ...publishable,
    ...pageContentEditor,
    externalLinks: relationship({
      ref: 'ExternalLink',
      many: true,
      isOrderable: true,
      ui: {
        displayMode: 'cards',
        cardFields: ['label', 'url'],
        inlineEdit: { fields: ['label', 'url'] },
        inlineCreate: { fields: ['label', 'url'] },
      },
    }),
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
        // inlineEdit: { fields: ['name', 'steps'] },
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
