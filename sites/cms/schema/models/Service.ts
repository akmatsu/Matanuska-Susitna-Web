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
        inlineConnect: true,
        inlineCreate: { fields: ['label', 'url'] },
      },
    }),
    ...timestamps,
  },
});
