import { list, ListConfig } from '@keystone-6/core';
import { isContributor } from '../access/roles';
import { relationship, text } from '@keystone-6/core/fields';
import { owner } from '../fieldUtils';

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
    owner,
    description: text({ ui: { displayMode: 'textarea' } }),
    users: relationship({ ref: 'User.groups', many: true }),
    services: relationship({ ref: 'Service.userGroups', many: true }),
    documentCollections: relationship({
      ref: 'DocumentCollection.userGroups',
      many: true,
    }),
  },
});
