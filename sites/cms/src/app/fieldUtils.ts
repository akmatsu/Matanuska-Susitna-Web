import { BaseFields, graphql, group } from '@keystone-6/core';
import {
  relationship,
  text,
  timestamp,
  virtual,
} from '@keystone-6/core/fields';
import { KeystoneContextFromListTypeInfo } from '@keystone-6/core/types';
import { isAdmin } from './access/roles';
import { isOwner } from './access/group';
import { appConfig } from '../configs/appConfig';
import { getDatetimeISOString } from './access';

export const urlRegex = /^(https?:\/\/)[^\s/$.?#].[^\s]*$/;
export const phoneNumberRegex =
  /^(\(\d{3}\)\s\d{3}-\d{4}|\d{3}-\d{3}-\d{4}|\d{3}\.\d{3}\.\d{4})$/;
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

export function liveUrl(
  listKey: string,
  identifierKey = 'slug',
  baseUrl = appConfig.siteUrl,
  ignorePubDates = false,
) {
  return virtual({
    field: graphql.field({
      type: graphql.String,
      resolve(baseItem: any) {
        baseItem as { [key: string]: string };
        return `${baseUrl}/${listKey}/${baseItem[identifierKey]}`;
      },
    }),
    ui: {
      views: './src/components/customFields/liveUrl/views.tsx',
      createView: {
        fieldMode: 'hidden',
      },
      itemView: {
        fieldPosition: 'sidebar',
        fieldMode(args) {
          if (ignorePubDates) return 'read';

          const now = getDatetimeISOString();
          const pubAt = args.item.publishAt
            ? getDatetimeISOString(args.item.publishAt as Date)
            : false;
          const unpubAt = args.item.unpublishAt
            ? getDatetimeISOString(args.item.unpublishAt as Date)
            : false;
          if (pubAt <= now && (!unpubAt || unpubAt >= now)) return 'read';
          else return 'hidden';
        },
      },
    },
  });
}

export function embed(
  listKey: string,
  identifierKey = 'slug',
  baseUrl = appConfig.siteUrl,
) {
  return virtual({
    field: graphql.field({
      type: graphql.String,
      resolve(baseItem: any) {
        baseItem as { [key: string]: string };
        return `${baseUrl}/${listKey}/${baseItem[identifierKey]}`;
      },
    }),
    ui: {
      views: './src/components/customFields/embed/views.tsx',
      itemView: {
        fieldPosition: 'sidebar',
      },
      createView: {
        fieldMode: 'hidden',
      },
    },
  });
}

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
    hideCreate: true,
  },
  hooks: {
    resolveInput: relateActiveUser,
  },
  access: {
    update: ({ session, item }) => isAdmin(session) || isOwner(session, item),
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

export function tags(listKey: string) {
  return relationship({
    ref: `Tag.${listKey}`,
    many: true,
    ui: {
      displayMode: 'select',
      searchFields: ['name'],
      itemView: {
        fieldPosition: 'sidebar',
      },
    },
  });
}

export function contacts(listKey: string) {
  return relationship({
    ref: `Contact.${listKey}`,
    many: true,
    ui: {
      itemView: {
        fieldPosition: 'sidebar',
      },
    },
  });
}

export function userGroups(listKey: string) {
  return relationship({
    ref: `UserGroup.${listKey}`,
    many: true,
    ui: {
      itemView: {
        fieldPosition: 'sidebar',
      },
    },
    access: {
      update: ({ session, item }) => isAdmin(session) || isOwner(session, item),
    },
  });
}

export function services(listKey: string) {
  return relationship({
    ref: `Service.${listKey}`,
    many: true,
  });
}
