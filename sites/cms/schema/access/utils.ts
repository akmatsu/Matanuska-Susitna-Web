import {
  AccessOperation,
  ListFilterAccessControl,
  ListItemAccessControl,
} from '@keystone-6/core/dist/declarations/src/types/config/access-control';
import {
  BaseListTypeInfo,
  ListOperationAccessControl,
} from '@keystone-6/core/types';
import { isAdmin, isContentManager, isContributor } from './roles';
import { belongsToGroup, isOwner } from './group';

type Operation =
  | ListOperationAccessControl<AccessOperation, BaseListTypeInfo>
  | {
      query: ListOperationAccessControl<'query', BaseListTypeInfo>;
      create: ListOperationAccessControl<'create', BaseListTypeInfo>;
      update: ListOperationAccessControl<'update', BaseListTypeInfo>;
      delete: ListOperationAccessControl<'delete', BaseListTypeInfo>;
    };

type Item = {
  create?: ListItemAccessControl<'create', BaseListTypeInfo>;
  update?: ListItemAccessControl<'update', BaseListTypeInfo>;
  delete?: ListItemAccessControl<'delete', BaseListTypeInfo>;
};

type Filter = {
  query?: ListFilterAccessControl<'query', BaseListTypeInfo> | undefined;
  update?: ListFilterAccessControl<'update', BaseListTypeInfo> | undefined;
  delete?: ListFilterAccessControl<'delete', BaseListTypeInfo> | undefined;
};

/**
 * Allows for public query access but requires at least {@link isContributor|Contributor}
 * permission level to create, read, and delete
 */
export const generalOperationAccess: Operation = {
  query: () => true,
  create: ({ session }) => isContributor(session),
  update: ({ session }) => isContributor(session),
  delete: ({ session }) => isContributor(session),
};

/**
 * Allows public query access but limits create, update, and delete to
 * {@link isContentManager|Content Managers} or higher.
 */
export const elevatedOperationAccess: Operation = {
  query: () => true,
  create: ({ session }) => isContentManager(session),
  update: ({ session }) => isContentManager(session),
  delete: ({ session }) => isContentManager(session),
};

/**
 * Allows for {@link isContributor | Contributors} and up to query but limits
 * create, update, and delete to {@link isAdmin|Admins}.
 */
export const internalMaxOperationAccess: Operation = {
  query: ({ session }) => isContributor(session),
  create: ({ session }) => isAdmin(session),
  update: ({ session }) => isAdmin(session),
  delete: ({ session }) => isAdmin(session),
};

/**
 * Limits all operations to {@link isAdmin|Admins} only.
 */
export const adminOnlyOperationAccess: Operation = {
  query: ({ session }) => isAdmin(session),
  create: ({ session }) => isAdmin(session),
  update: ({ session }) => isAdmin(session),
  delete: ({ session }) => isAdmin(session),
};

/**
 * Limits who can update and delete items based on their role:
 * 1. {@link isContentManager|Content Managers} and higher can update and delete
 * 2. {@link isOwner|Owners} can update and delete
 * 3. {@link belongsToGroup|Group Members} can update and delete
 */
export const generalItemAccess: Item = {
  update: async ({ session, item, context }) =>
    isContentManager(session) ||
    isOwner(session, item) ||
    belongsToGroup(session, item, context, 'Service'),

  delete: async ({ session, item, context }) =>
    isContentManager(session) ||
    isOwner(session, item) ||
    belongsToGroup(session, item, context, 'Service'),
};

/**
 * Filters out unpublished items from query results from public requests.
 */
export const filterByPubDates: Filter = {
  query: ({ session }) => {
    if (session) return {};
    return {
      AND: [
        {
          publishAt: {
            lte: getDatetimeISOString(),
          },
        },
        {
          OR: [
            {
              publishAt: {
                gte: getDatetimeISOString(),
              },
            },
            {
              unpublishAt: {
                equals: null,
              },
            },
          ],
        },
      ],
    };
  },
};

function getDatetimeISOString(date = new Date(Date.now())): string {
  return date.toISOString();
}
