import { list, ListConfig } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { password, relationship, text } from '@keystone-6/core/fields';
import { timestamps } from '../fieldUtils';

export const User: ListConfig<any> = list({
  access: allowAll,
  fields: {
    name: text({ validation: { isRequired: true } }),
    email: text({
      validation: { isRequired: true },
      isIndexed: 'unique',
    }),
    password: password({ validation: { isRequired: true } }),
    contact: relationship({ ref: 'Contact.user' }),
    ...timestamps,
  },
});
