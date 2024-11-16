import { group, list, ListConfig } from '@keystone-6/core';
import { relationship, text } from '@keystone-6/core/fields';
import {
  publishable,
  slug,
  timestamps,
  titleAndDescription,
  urlRegex,
} from '../fieldUtils';
import { customText } from '../../customFields/Markdown';
import { isContributor } from '../roles';

function getDatetimeISOString(date = new Date(Date.now())): string {
  return date.toISOString();
}

export const Service: ListConfig<any> = list({
  access: {
    operation: {
      query: ({ session }) => true,
      create: ({ session }) => isContributor(session),
      update: ({ session }) => isContributor(session),
      delete: ({ session }) => isContributor(session),
    },
    filter: {
      query: ({ session }) => {
        if (session) return {};
        return {
          AND: [
            {
              publishAt: {
                lte: getDatetimeISOString(),
              },
            },
            {
              OR: [
                {
                  publishAt: {
                    gte: getDatetimeISOString(),
                  },
                },
                {
                  unpublishAt: {
                    equals: null,
                  },
                },
              ],
            },
          ],
        };
      },
    },
  },
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
