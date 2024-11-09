import { graphql, list, ListConfig } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';

import { relationship, text, virtual } from '@keystone-6/core/fields';
import { QueryMode } from '@keystone-6/core/types';

export const DocumentCollection: ListConfig<any> = list({
  access: allowAll,
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
