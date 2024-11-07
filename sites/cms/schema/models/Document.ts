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
    title: text({ validation: { isRequired: true }, isIndexed: true }),
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
    }),
    collections: relationship({
      ref: 'DocumentCollection.documents',
      many: true,
      ui: {
        displayMode: 'select',
        searchFields: ['title'],
      },
    }),
    editorNotes: text({
      ui: {
        displayMode: 'textarea',
      },
    }),
  },
});
