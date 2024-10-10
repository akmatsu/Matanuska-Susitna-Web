import { list, ListConfig } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { password, relationship, text } from '@keystone-6/core/fields';
import { timestamps } from '../fieldUtils';

export const User: ListConfig<any> = list({
  access: allowAll,
  ui: {
    hideCreate: true,
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
    ...timestamps,
  },
});
