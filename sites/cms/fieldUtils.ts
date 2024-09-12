import { BaseFields } from '@keystone-6/core';
import { timestamp } from '@keystone-6/core/fields';

export const timestamps: BaseFields<any> = {
  createdAt: timestamp({
    defaultValue: { kind: 'now' },
    ui: { itemView: { fieldMode: 'read', fieldPosition: 'sidebar' } },
  }),
  updatedAt: timestamp({
    defaultValue: { kind: 'now' },
    db: { updatedAt: true },
    ui: { itemView: { fieldMode: 'read', fieldPosition: 'sidebar' } },
  }),
};

export const publishable: BaseFields<any> = {
  publishAt: timestamp({ validation: { isRequired: true } }),
};
