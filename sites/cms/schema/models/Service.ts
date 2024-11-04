import { group, list, ListConfig } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { relationship, text } from '@keystone-6/core/fields';
import {
  publishable,
  slug,
  timestamps,
  titleAndDescription,
  urlRegex,
} from '../fieldUtils';
import { customText } from '../../customFields/Markdown';

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

    ...group({
      label: 'Primary Action',
      fields: {
        actionLabel: text({
          validation: {
            length: {
              max: 100,
            },
          },
          db: {
            isNullable: true,
          },
          ui: {
            itemView: {
              fieldPosition: 'sidebar',
            },
          },
        }),
        actionUrl: text({
          validation: {
            match: {
              regex: urlRegex,
            },
          },
          db: {
            isNullable: true,
          },
          ui: {
            itemView: {
              fieldPosition: 'sidebar',
            },
          },
        }),
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
      },
    }),

    tags: relationship({
      ref: 'Tag.services',
      many: true,
      ui: {
        displayMode: 'select',
        searchFields: ['name'],
        itemView: {
          fieldPosition: 'sidebar',
        },
      },
    }),

    primaryContact: relationship({
      ref: 'Contact.primaryServices',
      ui: {
        itemView: {
          fieldPosition: 'sidebar',
        },
      },
    }),

    contacts: relationship({
      ref: 'Contact.services',
      many: true,
      ui: {
        itemView: {
          fieldPosition: 'sidebar',
        },
      },
    }),
    ...timestamps,
    editorNotes: text({
      ui: {
        displayMode: 'textarea',
      },
    }),
  },
});
