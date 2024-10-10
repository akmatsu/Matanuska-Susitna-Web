import { list, ListConfig } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { publishable, titleAndDescription } from '../fieldUtils';
import { text } from '@keystone-6/core/fields';
import { linkField } from '../../customFields/link';

export const Highlight: ListConfig<any> = list({
  access: allowAll,
  graphql: {
    maxTake: 100,
  },
  fields: {
    title: text({ validation: { isRequired: true } }),
    ...publishable,
    link: linkField(),
    image: text(),
  },
});
