import { list, ListConfig } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { text } from '@keystone-6/core/fields';
import { timestamps, urlRegex } from '../fieldUtils';

export const ExternalLink: ListConfig<any> = list({
  access: allowAll,
  ui: {
    isHidden: true,
  },
  fields: {
    label: text({
      validation: {
        isRequired: true,
        length: {
          min: 2,
          max: 50,
        },
      },
      ui: {
        displayMode: 'input',
        description: 'Label to be used on link.',
        itemView: {
          fieldPosition: 'sidebar',
        },
      },
    }),
    url: text({
      validation: {
        isRequired: true,
        length: {
          min: 7,
        },
        match: {
          regex: urlRegex,
          explanation:
            'You must provide a valid URL. Valid urls start with http:// or https:// and end with something like .com or .org etc.',
        },
      },
      ui: {
        displayMode: 'input',
        description: 'Please provide a URL to the external web page',
      },
    }),
    ...timestamps,
  },
});
