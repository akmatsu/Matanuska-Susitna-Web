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
import { TYPESENSE_CLIENT, TYPESENSE_COLLECTIONS } from '../../typesense';

export function parseServicesTypeSenseSchema(item: any) {
  return {
    id: item.id,
    title: item.title || '',
    description: item.description || '',
    body: item.body || '',
    slug: item.slug,
    action_label: item.actionLabel,
    publish_at: item.publishAt
      ? Math.floor(new Date(item.publishAt).getTime() / 1000)
      : 0,
    tags: item.tags.map((tag: { name: string }) => tag.name || ''),
  };
}

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
  hooks: {
    async beforeOperation({ operation, context, item }) {
      if (operation === 'delete') {
        try {
          TYPESENSE_CLIENT.collections(TYPESENSE_COLLECTIONS.SERVICES)
            .documents(item.id.toString())
            .delete();
        } catch (error: any) {
          console.error('Error deleting Typesense document', error);
        }
      }
    },

    async afterOperation({ operation, context, item }) {
      if (operation === 'update' || operation === 'create') {
        try {
          const service = await context.query.Service.findOne({
            where: { id: item.id.toString() },
            query:
              'id title description body slug owner {name} actionLabel publishAt tags {name}',
          });
          const document = parseServicesTypeSenseSchema(service);

          TYPESENSE_CLIENT.collections(TYPESENSE_COLLECTIONS.SERVICES)
            .documents()
            .upsert(document);
        } catch (error: any) {
          console.error('Error updating Typesense document:', error);
        }
      }
    },
  },
});
