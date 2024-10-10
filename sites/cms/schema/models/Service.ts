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
    body: customText({
      ui: {
        description:
          'The body is the main body of the page. You can use this for writing more information about the service.',
      },
    }),
    ...group({
      label: 'Primary Action',
      description:
        'The primary action is the main thing you want users to do for this Service and will be displayed prominently on the page.',
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
            description:
              'This is the text that will be used on the primary action link in the UI',
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
            description:
              'This is the URL users will be directed to when they click the primary action button in the UI',
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
        description:
          'A process is step based instructions on how to apply for or receive a service. These will be displayed in the main body of the page.',
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

    primaryContact: relationship({
      ref: 'Contact.primaryServices',
      ui: {
        description: 'This contact will be displayed prominently on the page.',
      },
    }),
    contacts: relationship({
      ref: 'Contact.services',
      many: true,
      ui: {
        description:
          'These are secondary contacts, displayed in a list below the primary contact',
      },
    }),
    ...timestamps,
  },
});
