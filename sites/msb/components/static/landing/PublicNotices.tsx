import { LinkButton } from '../LinkButton';
import { PublicNoticeCard } from '../Page/PublicNoticeCard';
import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';

const publicNoticeListFragment = gql(`
  fragment PublicNoticeList on PublicNotice {
    id
    urgency
    publishAt
    ...PublicNoticeFields
  }
`);

export function PublicNotices(props: {
  items: FragmentType<typeof publicNoticeListFragment>[];
}) {
  const items = getFragmentData(publicNoticeListFragment, props.items);

  if (!items?.length) return null;

  const sorted = [...items].sort((a, b) => {
    const aPriority = a.urgency ?? Infinity;
    const bPriority = b.urgency ?? Infinity;
    if (aPriority === bPriority) {
      return new Date(b.publishAt).getTime() - new Date(a.publishAt).getTime();
    }

    return aPriority - bPriority;
  });

  return (
    <div className="flex flex-col items-center gap-4">
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        {sorted.map((item, index) => (
          <PublicNoticeCard
            publicNotice={item}
            key={item.id}
            flag={index === 0}
          />
        ))}
      </ul>
      <LinkButton href="/public-notices" size="lg" color="primary">
        View All Announcements & Public Notices
      </LinkButton>
    </div>
  );
}
