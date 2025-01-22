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
    async afterOperation({ operation, context, item }) {
      if (operation === 'create') {
        try {
          // Do something after a new item is created
        } catch (error: any) {
          console.error('Error creating Typesense document:', error);
        }
      }

      if (operation === 'update') {
        try {
          const service = await context.query.Service.findOne({
            where: { id: item.id.toString() },
            query:
              'id title description body slug owner {name} actionLabel publishAt tags {name}',
          });
          const document = {
            id: service.id,
            title: service.title,
            description: service.description || '',
            body: service.body || '',
            slug: service.slug,
            owner: service.owner.name || '',
            actionLabel: service.actionLabel || '',
            publishedAt: service.publishAt
              ? Math.floor(new Date(service.publishAt).getTime() / 1000)
              : 0,
            tags: service.tags.map((tag: { name: string }) => tag.name),
          };

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
