import { list, ListConfig } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { relationship, text } from '@keystone-6/core/fields';

export const Tag: ListConfig<any> = list({
  access: allowAll,
  ui: {
    isHidden: true,
  },
  fields: {
    name: text(),
    services: relationship({ ref: 'Service.tags', many: true }),
    documents: relationship({ ref: 'Document.tags', many: true }),
  },
});
