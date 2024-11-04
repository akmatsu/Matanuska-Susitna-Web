import { list, ListConfig } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { relationship, text } from '@keystone-6/core/fields';

export const DocumentCollection: ListConfig<any> = list({
  // TODO create a relationship between pages a DocumentCollection is used on.
  // TODO consider a way to search for orphan DocumentCollections.
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
  },
});
