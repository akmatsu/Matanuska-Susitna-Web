import { group, list, ListConfig } from '@keystone-6/core';
import { relationship, text } from '@keystone-6/core/fields';
import {
  liveUrl,
  owner,
  publishable,
  slug,
  tags,
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
    liveUrl: liveUrl('services'),
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

    tags: tags('services'),
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
    communities: relationship({
      ref: 'Community.services',
      many: true,
      ui: {
        itemView: {
          fieldPosition: 'sidebar',
        },
        hideCreate: true,
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
