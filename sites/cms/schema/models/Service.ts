import { graphql, group, list, ListConfig } from '@keystone-6/core';
import { relationship, text, virtual } from '@keystone-6/core/fields';
import {
  owner,
  publishable,
  slug,
  timestamps,
  titleAndDescription,
  urlRegex,
  userGroups,
} from '../fieldUtils';
import { customText } from '../../customFields/Markdown';

import {
  filterByPubDates,
  generalItemAccess,
  generalOperationAccess,
  getDatetimeISOString,
} from '../access/utils';

export const Service: ListConfig<any> = list({
  access: {
    operation: generalOperationAccess,
    item: generalItemAccess,
    filter: filterByPubDates,
  },
  graphql: {
    maxTake: 100,
  },
  fields: {
    ...titleAndDescription(),
    ...publishable,
    liveUrl: virtual({
      field: graphql.field({
        type: graphql.String,
        resolve(baseItem) {
          return `https://matsugov.us/services/${baseItem.slug}`;
        },
      }),
      ui: {
        views: './customFields/liveUrl/views.tsx',
        createView: {
          fieldMode: 'hidden',
        },
        itemView: {
          fieldPosition: 'sidebar',
          fieldMode(args) {
            const now = getDatetimeISOString();
            const pubAt = args.item.publishAt
              ? getDatetimeISOString(args.item.publishAt as Date)
              : false;
            const unpubAt = args.item.unpublishAt
              ? getDatetimeISOString(args.item.unpublishAt as Date)
              : false;
            if (pubAt <= now && (!unpubAt || unpubAt >= now)) return 'read';
            else return 'hidden';
          },
        },
      },
    }),
    slug,
    owner,
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

    userGroups: userGroups('services'),

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
