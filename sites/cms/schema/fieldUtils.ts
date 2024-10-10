import { BaseFields, group } from '@keystone-6/core';
import { text, timestamp } from '@keystone-6/core/fields';

export const urlRegex = /^(https?:\/\/)[^\s/$.?#].[^\s]*$/;

export const timestamps: BaseFields<any> = {
  createdAt: timestamp({
    defaultValue: { kind: 'now' },
    ui: {
      itemView: {
        fieldMode: 'read',
        fieldPosition: 'sidebar',
      },
      createView: { fieldMode: 'hidden' },
    },
  }),
  updatedAt: timestamp({
    defaultValue: { kind: 'now' },
    db: { updatedAt: true },
    ui: {
      itemView: { fieldMode: 'read', fieldPosition: 'sidebar' },
      createView: { fieldMode: 'hidden' },
    },
  }),
};

export const publishable: BaseFields<any> = {
  ...group({
    label: 'Publishing',
    description:
      'These fields are used for managing the public visibility of this page.',
    fields: {
      publishAt: timestamp({
        ui: {
          itemView: {
            fieldPosition: 'sidebar',
          },

          description:
            'When page should be visible. If blank, page is treated as a draft. Set to today if you want to publish now.',
        },
      }),
      unpublishAt: timestamp({
        ui: {
          itemView: {
            fieldPosition: 'sidebar',
          },
          description:
            'When the page should be hidden from website. If blank, page will never be hidden.',
        },
        hooks: {
          validate: ({ resolvedData, item, addValidationError }) => {
            const publishAt = resolvedData['publishAt'] || item['publishAt'];
            const unpublishAt = resolvedData['unpublishAt'];

            if (!publishAt && unpublishAt) {
              addValidationError(
                'You have set an Unpublish date but no Publish date. Either remove the Unpublish date or add a Publish date.',
              );
            }

            if (publishAt && unpublishAt) {
              const pub = new Date(publishAt);
              const unPub = new Date(unpublishAt);
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
};

export function titleAndDescription(opts?: {
  title?: {
    required?: boolean;
    lengthMin?: number;
    lengthMax?: number;
    description?: string;
  };
  description?: {
    description?: string;
  };
}): BaseFields<any> {
  return {
    title: text({
      validation: {
        // If required is undefined will default to true, otherwise uses the value of required
        isRequired:
          opts?.title?.required !== undefined ? opts.title.required : true,
        length: {
          max: opts?.title?.lengthMax || 100,
          min: opts?.title?.lengthMin || 2,
        },
      },
      ui: {
        displayMode: 'input',
        description:
          opts?.title?.description ||
          'Title is used as the fist header of the page and used in Page meta data for search engines and social media.',
      },
    }),
    description: text({
      validation: {
        length: {
          max: 255,
        },
      },
      ui: {
        displayMode: 'textarea',
        description:
          opts?.description?.description ||
          'THIS IS NOT DISPLAYED ON THE PAGE. Description is only displayed on lists, and used in Page meta data for search engines and social media.',
      },
    }),
  };
}

export const slug = text({
  isIndexed: 'unique',
  ui: {
    createView: {
      fieldMode: 'hidden',
    },
    itemView: {
      fieldPosition: 'sidebar',
    },
    description:
      'A slug is used to uniquely identify a page in the website and used in web page URLs.',
  },

  hooks: {
    resolveInput: ({ operation, resolvedData, fieldKey }) => {
      if (operation === 'create') {
        if (resolvedData['title']) {
          const title = resolvedData['title'] as string;
          return title.toLowerCase().replace(/\s/gi, '-');
        }
      }
      return resolvedData[fieldKey];
    },
  },
});
