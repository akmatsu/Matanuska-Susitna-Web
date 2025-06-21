import { LinkButton } from '../LinkButton';
import { PublicNoticeCard } from '../Page/PublicNoticeCard';
import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';

const publicNoticeListFragment = gql(`
  fragment PublicNoticeList on PublicNotice {
    id
    ...PublicNoticeFields
  }
`);

export function PublicNotices(props: {
  items: FragmentType<typeof publicNoticeListFragment>[];
}) {
  const items = getFragmentData(publicNoticeListFragment, props.items);
  return (
    <div className="flex flex-col items-center gap-4">
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        {items.map((item, index) => (
          <PublicNoticeCard
            publicNotice={item}
            key={item.id}
            flag={index === 0}
          />
        ))}
      </ul>
      <LinkButton href="/public-notices" big>
        View All Announcements & Public Notices
      </LinkButton>
    </div>
  );
}
