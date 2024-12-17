import { group, list, ListConfig } from '@keystone-6/core';
import { generalItemAccess, generalOperationAccess } from '../access';
import {
  emailRegex,
  liveUrl,
  owner,
  phoneNumberRegex,
  slug,
  titleAndDescription,
} from '../fieldUtils';
import { relationship, text, timestamp } from '@keystone-6/core/fields';

export const AssemblyDistrict: ListConfig<any> = list({
  access: {
    operation: generalOperationAccess,
    item: generalItemAccess,
  },
  fields: {
    ...titleAndDescription(),
    liveUrl: liveUrl(''),
    slug,
    owner,
    ...group({
      label: 'Assembly Member Information',
      fields: {
        photo: relationship({
          ref: 'Image',
          ui: {
            inlineConnect: true,
            displayMode: 'cards',
            cardFields: ['title', 'file'],
            inlineCreate: {
              fields: ['title', 'description', 'file', 'tags'],
            },
            inlineEdit: {
              fields: ['title', 'description', 'file', 'tags'],
            },
          },
        }),
        memberName: text(),
        bio: text({
          ui: {
            displayMode: 'textarea',
          },
        }),
        address: text(),
        email: text({
          validation: {
            match: {
              regex: emailRegex,
              explanation: 'You must input a valid email address.',
            },
            isRequired: false,
          },
          db: {
            isNullable: true,
          },
        }),
        phone: text({
          validation: {
            match: {
              regex: phoneNumberRegex,
              explanation:
                'You must input a valid phone number. Example: 123-456-7890',
            },
            isRequired: false,
          },
          db: {
            isNullable: true,
          },
        }),
        fax: text({
          validation: {
            match: {
              regex: phoneNumberRegex,
              explanation:
                'You must input a valid phone number. Example: 123-456-7890',
            },
            isRequired: false,
          },
          db: {
            isNullable: true,
          },
        }),
        termStart: timestamp({
          db: {
            isNullable: true,
          },
        }),
        termEnd: timestamp({
          db: {
            isNullable: true,
          },
          hooks: {
            validate: ({ resolvedData, item, addValidationError }) => {
              const termStart =
                resolvedData?.['termStart'] || item?.['termStart'];
              const termEnd = resolvedData?.['termEnd'];

              if (!termStart && termEnd) {
                addValidationError(
                  'You have set an Unpublish date but no Publish date. Either remove the Unpublish date or add a Publish date.',
                );
              }

              if (termStart && termEnd) {
                const pub = new Date(termStart);
                const unPub = new Date(termEnd);
                if (unPub <= pub) {
                  addValidationError(
                    'Invalid unpublish date. Please select an unpublish date that is after the publish date.',
                  );
                }
              }
            },
          },
        }),
      },
    }),
  },
});
