import { list, ListConfig } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { relationship, text } from '@keystone-6/core/fields';
import { timestamps } from '../fieldUtils';

export const Process: ListConfig<any> = list({
  access: allowAll,
  ui: {
    isHidden: true,
  },
  fields: {
    name: text({ validation: { isRequired: true } }),
    service: relationship({
      ref: 'Service.processes',
      ui: { hideCreate: true, itemView: { fieldPosition: 'sidebar' } },
    }),
    steps: relationship({
      ref: 'Step.process',
      many: true,
      isOrderable: true,
      ui: {
        displayMode: 'cards',
        cardFields: ['label'],
        inlineCreate: { fields: ['label', 'body'] },
        inlineEdit: { fields: ['label', 'body'] },
      },
    }),
    ...timestamps,
  },
});
