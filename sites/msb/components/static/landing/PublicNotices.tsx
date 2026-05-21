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

function normalizeDate(value: unknown): string | number | Date {
  if (
    typeof value === 'string' ||
    typeof value === 'number' ||
    value instanceof Date
  ) {
    return value;
  }
  return new Date();
}

export function PublicNotices(props: {
  items: FragmentType<typeof publicNoticeListFragment>[];
}) {
  const items = getFragmentData(publicNoticeListFragment, props.items);

  if (!items?.length) return null;

  const sorted = [...items].sort((a, b) => {
    const aPriority = a.urgency ?? Infinity;
    const bPriority = b.urgency ?? Infinity;
    if (aPriority === bPriority) {
      return (
        new Date(normalizeDate(b.publishAt)).getTime() -
        new Date(normalizeDate(a.publishAt)).getTime()
      );
    }

    return aPriority - bPriority;
  });

  return (
    <div className="flex flex-col items-center gap-4">
      <ul className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
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
