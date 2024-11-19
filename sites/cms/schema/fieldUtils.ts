import { BaseFields, group } from '@keystone-6/core';
import { relationship, text, timestamp } from '@keystone-6/core/fields';
import { KeystoneContextFromListTypeInfo } from '@keystone-6/core/types';

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
      reviewDate: timestamp({
        db: {
          isNullable: true,
        },
        ui: {
          createView: { fieldMode: 'hidden' },
        },
        hooks: {
          resolveInput: ({ operation, resolvedData }) => {
            if (operation === 'create' && !resolvedData?.reviewDate) {
              const reviewDate = new Date();
              reviewDate.setMonth(reviewDate.getMonth() + 6);
              return reviewDate;
            }
            return resolvedData.reviewDate;
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
      isIndexed: true,
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
      isIndexed: true,
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

export const owner = relationship({
  ref: 'User',
  ui: {
    createView: {
      fieldMode: 'hidden',
    },
  },
  hooks: {
    resolveInput: relateActiveUser,
  },
});

export function relateActiveUser({
  operation,
  resolvedData,
  context,
  fieldKey,
}: {
  operation: 'create' | 'update';
  resolvedData: any;
  context: KeystoneContextFromListTypeInfo<any>;
  fieldKey: any;
}) {
  if (operation === 'create') {
    return context.session?.id ? { connect: { id: context.session.id } } : null;
  }
  return resolvedData?.[fieldKey];
}
