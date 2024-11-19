import { KeystoneContext } from '@keystone-6/core/types';
import { Session } from '../../auth';

/**
 * Checks if the user is the owner of the item.
 */
export function isOwner(user: Session, item: any) {
  return user.id === item.ownerId;
}

/**
 * Checks if the user belongs to any groups that have access to the given item.
 */
export async function belongsToGroup(
  user: Session,
  item: any,
  context: KeystoneContext,
  listKey: string,
): Promise<boolean> {
  const [userGroups, ownedGroups, itemGroups] = await Promise.all([
    getActiveUserGroups(user.id, context),
    getActiveUserOwnedGroups(user.id, context),
    getItemsGroups(item.id, listKey, context),
  ]);

  const combinedGroups = [...userGroups, ...ownedGroups];
  return checkIfUserHasItemGroup(combinedGroups, itemGroups);
}

async function getActiveUserGroups(id: string, ctx: KeystoneContext) {
  const res = await ctx.query.User.findOne({
    where: { id: id },
    query: 'groups { id }',
  });

  return res.groups as { id: string }[];
}

async function getActiveUserOwnedGroups(id: string, ctx: KeystoneContext) {
  const res = await ctx.query.UserGroup.findMany({
    where: { owner: { id: { equals: id } } },
  });

  return res as { id: string }[];
}

async function getItemsGroups(id: string, lk: string, ctx: KeystoneContext) {
  const res = await ctx.query?.[lk].findOne({
    where: { id: id },
    query: 'userGroups { id }',
  });

  return res.itemGroups as { id: string }[];
}

function checkIfUserHasItemGroup(
  ug: { id: string }[],
  ig: { id: string }[],
): boolean {
  for (let i = 0, l = ug.length; i < l; i++) {
    const t = ug[i];
    if (ig.includes(t)) {
      return true;
    }
  }
  return false;
}
