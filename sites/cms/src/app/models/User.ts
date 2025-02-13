import { list, ListConfig } from '@keystone-6/core';
import { password, relationship, select, text } from '@keystone-6/core/fields';
import { timestamps } from '../fieldUtils';
import { isAdmin, ROLES } from '../access/roles';
import { internalMaxOperationAccess } from '../access';

export const User: ListConfig<any> = list({
  access: {
    operation: internalMaxOperationAccess,
  },
  ui: {
    hideCreate: true,
    isHidden: ({ session }) => !isAdmin(session),
  },
  fields: {
    authId: text({
      isIndexed: 'unique',
      ui: {
        itemView: { fieldMode: 'hidden' },
        createView: { fieldMode: 'hidden' },
        listView: { fieldMode: 'hidden' },
      },
    }),
    name: text({ validation: { isRequired: true } }),
    email: text({
      validation: { isRequired: true },
      isIndexed: 'unique',
    }),
    password: password({
      validation: { isRequired: false },
      db: { isNullable: true },
    }),
    contact: relationship({ ref: 'Contact.user' }),
    role: select({
      type: 'integer',
      options: [
        {
          label: 'Admin',
          value: ROLES.ADMIN,
        },
        {
          label: 'Content Manager',
          value: ROLES.CONTENT_MANAGER,
        },
        {
          label: 'Contributor',
          value: ROLES.CONTRIBUTOR,
        },
        {
          label: 'Collaborator',
          value: ROLES.COLLABORATOR,
        },
      ],
      defaultValue: ROLES.COLLABORATOR,
    }),
    groups: relationship({
      ref: 'UserGroup.users',
      many: true,
      ui: {
        itemView: {
          fieldPosition: 'sidebar',
        },
      },
    }),

    ...timestamps,
  },
});
