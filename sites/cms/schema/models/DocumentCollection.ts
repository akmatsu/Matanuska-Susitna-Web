import { graphql, list, ListConfig } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';

import { relationship, text, virtual } from '@keystone-6/core/fields';
import { isCollaborator, isContributor } from '../roles';

export const DocumentCollection: ListConfig<any> = list({
  // access: allowAll,
  access: {
    operation: {
      query: ({ session }) => true,
      create: ({ session }) => isContributor(session),
      update: ({ session }) => isContributor(session),
      delete: ({ session }) => isContributor(session),
    },
  },
  graphql: {
    maxTake: 100,
  },
  fields: {
    title: text({ validation: { isRequired: true } }),
    documents: relationship({
      ref: 'Document.collections',
      many: true,
      ui: {
        displayMode: 'cards',
        inlineConnect: true,
        cardFields: ['title', 'description', 'file', 'tags'],
        inlineCreate: { fields: ['title', 'description', 'file', 'tags'] },
        inlineEdit: { fields: ['title', 'description', 'file', 'tags'] },
      },
    }),

    tags: relationship({
      ref: 'Tag.documentCollections',
      many: true,
      ui: {
        displayMode: 'select',
        searchFields: ['name'],
        itemView: {
          fieldPosition: 'sidebar',
        },
      },
    }),

    userGroups: relationship({
      ref: 'UserGroup.documentCollections',
      many: true,
      ui: {
        itemView: {
          fieldPosition: 'sidebar',
        },
      },
    }),

    editorNotes: text({
      ui: {
        displayMode: 'textarea',
      },
    }),

    referencedBy: virtual({
      field: (lists) =>
        graphql.field({
          type: graphql.list(lists.Service.types.output),
          async resolve(item, args, context) {
            const res = await context.db.Service.findMany({
              where: {
                body: {
                  contains: item.id.toString(),
                  mode: 'insensitive',
                },
              },
            });

            return res;
          },
        }),

      ui: {
        query: '{ title id }',
        views: './customFields/ReferencedBy/views.tsx',
        createView: {
          fieldMode: 'hidden',
        },
      },
    }),
  },
});
