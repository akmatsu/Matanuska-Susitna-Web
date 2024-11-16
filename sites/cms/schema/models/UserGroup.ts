import { list, ListConfig } from '@keystone-6/core';
import { isContributor } from '../roles';
import { relationship, text } from '@keystone-6/core/fields';

export const UserGroup: ListConfig<any> = list({
  access: {
    operation: {
      query: ({ session }) => isContributor(session),
      create: ({ session }) => isContributor(session),
      update: ({ session }) => isContributor(session),
      delete: ({ session }) => isContributor(session),
    },
  },
  fields: {
    name: text({ validation: { isRequired: true } }),
    owner: relationship({ ref: 'User' }),
    description: text({ ui: { displayMode: 'textarea' } }),
    users: relationship({ ref: 'User.groups', many: true }),
    services: relationship({ ref: 'Service.userGroups', many: true }),
    documentCollections: relationship({
      ref: 'DocumentCollection.userGroups',
      many: true,
    }),
  },
});
