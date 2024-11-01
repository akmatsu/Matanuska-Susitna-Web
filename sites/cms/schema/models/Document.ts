import { list, ListConfig } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { file, relationship, text } from '@keystone-6/core/fields';
import { appConfig } from '../../appConfig';

export const Document: ListConfig<any> = list({
  // TODO: Consider a way to search for Orphaned documents.
  access: allowAll,
  graphql: {
    maxTake: 100,
  },
  fields: {
    title: text({ validation: { isRequired: true } }),
    description: text({ validation: { isRequired: false } }),
    tags: relationship({
      ref: 'Tag.documents',
      many: true,
      ui: {
        displayMode: 'select',
        searchFields: ['name'],
        itemView: {
          fieldPosition: 'sidebar',
        },
      },
    }),
    file: file({
      storage:
        appConfig.nodeEnv === 'production' ? 's3Documents' : 'localDocuments',
      hooks: {
        beforeOperation: () => {
          console.log('Starting to update document');
        },

        afterOperation: () => {
          console.log('Finished operation');
        },
      },
    }),
    collections: relationship({
      ref: 'DocumentCollection.documents',
      many: true,
      ui: {
        displayMode: 'select',
        searchFields: ['title'],
      },
    }),
  },
});
