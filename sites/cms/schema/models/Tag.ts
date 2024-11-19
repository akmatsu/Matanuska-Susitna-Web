import { list, ListConfig } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { relationship, text } from '@keystone-6/core/fields';
import { isAdmin, isCollaborator, isContributor } from '../access/roles';
import { generalOperationAccess } from '../access';

export const Tag: ListConfig<any> = list({
  access: {
    operation: generalOperationAccess,
  },
  ui: {
    isHidden: ({ session }) => !isAdmin(session),
  },
  fields: {
    name: text(),
    services: relationship({ ref: 'Service.tags', many: true }),
    documents: relationship({ ref: 'Document.tags', many: true }),
    documentCollections: relationship({
      ref: 'DocumentCollection.tags',
      many: true,
    }),
  },
});
