import { KeystoneContext } from '@keystone-6/core/types';
import { Session } from '../../auth';

export function isOwner(user: Session, item: any) {
  return user.id === item.ownerId;
}

// TODO! Finish setting up group filters
export async function belongsToGroup(
  user: Session,
  item: any,
  context: KeystoneContext,
  listKey: string,
) {
  const [u, g, i] = await Promise.all([
    context.query.User.findOne({
      where: { id: user.id },
      query: `groups { id }`,
    }),
    context.query.UserGroup.findMany({
      where: { owner: { id: { equals: user.id } } },
      query: 'id',
    }),
    context.query[listKey].findOne({
      where: { id: item.id },
      query: 'userGroups { id }',
    }),
  ]);

  const userGroups = [...u.groups, ...g] as { id: string }[];
  const itemGroups = i.userGroups as { id: string }[];

  if (
    userGroups.some((item) => {
      return itemGroups.includes(item);
    })
  )
    return true;
  return false;
}
