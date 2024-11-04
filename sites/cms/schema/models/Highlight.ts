import { group, list, ListConfig } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';
import { publishable, titleAndDescription, urlRegex } from '../fieldUtils';
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
    image: text({
      ui: {
        description:
          'URL to a web hosted image. See images.matsu.gov for internal Borough images.',
      },
      validation: {
        isRequired: true,
        match: {
          regex: urlRegex,
          explanation: 'Use a valid URL to a web hosted image.',
        },
      },
    }),
    ...group({
      label: 'Call to Action',
      description:
        'These fields are for controlling the call to action display on the highlight',
      fields: {
        message: text({ ui: { displayMode: 'textarea' } }),
        internalLink: linkField({
          ui: {
            description:
              "Optional, use this to link to internal pages. If you can't find a page you're looking for, it's probably external",
          },
        }),
        externalLink: text({
          ui: {
            description:
              'Optional, use this to link to external pages. Only accepts URLs.',
          },
          validation: {
            match: {
              regex: urlRegex,
              explanation: 'Must be a valid URL.',
            },
          },
          db: {
            isNullable: true,
          },
          hooks: {
            validate: ({
              addValidationError,
              item,
              resolvedData,
              operation,
            }) => {
              if (operation === 'create' || operation === 'update') {
                const internalLink =
                  resolvedData?.['internalLink'] || item?.['internalLink'];
                const externalLink =
                  resolvedData?.['externalLink'] || item?.['externalLink'];

                if (internalLink && externalLink) {
                  addValidationError(
                    'A highlight can only have one link but there is both an external and internal link. Remove one.',
                  );
                }
              }
            },
          },
        }),
      },
    }),
    editorNotes: text({
      ui: {
        displayMode: 'textarea',
      },
    }),
  },
});
