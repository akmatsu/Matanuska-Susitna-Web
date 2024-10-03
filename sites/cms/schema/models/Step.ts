import { list, ListConfig } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { relationship, text } from '@keystone-6/core/fields';
import { timestamps } from '../fieldUtils';
import { customText } from '../../customFields';

export const Step: ListConfig<any> = list({
  access: allowAll,
  ui: {
    isHidden: true,
  },
  fields: {
    label: text({ validation: { isRequired: true } }),
    process: relationship({ ref: 'Process.steps' }),
    body: customText(),
    ...timestamps,
  },
});
