import { list, ListConfig } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { relationship, text } from '@keystone-6/core/fields';
import {
  pageContentEditor,
  publishable,
  slug,
  timestamps,
  titleAndDescription,
  urlRegex,
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
    primaryAction: text({
      validation: {
        match: {
          regex: urlRegex,
        },
      },
    }),
    primaryActionLabel: text({
      validation: {
        length: {
          max: 100,
        },
      },
    }),
    body: customText(),

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

    primaryContact: relationship({ ref: 'Contact.primaryServices' }),
    contacts: relationship({ ref: 'Contact.services', many: true }),
    ...timestamps,
  },
});
