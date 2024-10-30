import { BaseFields, group } from '@keystone-6/core';
import { text, timestamp } from '@keystone-6/core/fields';

export const urlRegex = /^(https?:\/\/)[^\s/$.?#].[^\s]*$/;

export const timestamps: BaseFields<any> = {
  createdAt: timestamp({
    defaultValue: { kind: 'now' },
    ui: {
      itemView: {
        fieldMode: 'hidden',
        fieldPosition: 'sidebar',
      },
      createView: { fieldMode: 'hidden' },
    },
  }),
  updatedAt: timestamp({
    defaultValue: { kind: 'now' },
    db: { updatedAt: true },
    ui: {
      itemView: { fieldMode: 'hidden', fieldPosition: 'sidebar' },
      createView: { fieldMode: 'hidden' },
    },
  }),
};

export const publishable: BaseFields<any> = {
  ...group({
    label: 'Publishing',

    fields: {
      publishAt: timestamp({
        db: {
          isNullable: true,
        },
      }),
      unpublishAt: timestamp({
        db: {
          isNullable: true,
        },
        hooks: {
          validate: ({ resolvedData, item, addValidationError }) => {
            const publishAt =
              resolvedData?.['publishAt'] || item?.['publishAt'];
            const unpublishAt = resolvedData?.['unpublishAt'];

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
