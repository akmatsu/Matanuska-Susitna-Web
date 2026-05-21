import { PageSection } from './PageSection';
import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';
import { PublicNoticeCard } from './PublicNoticeCard';

const PagePublicNoticesFragment = gql(`
  fragment PagePublicNotices on BasePageWithDefaultRelationships {
    publicNotices(take: 5, orderBy: { urgency: desc }) {
      id
      urgency
      publishAt
      ...PublicNoticeFields
    }
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

export function PagePublicNotices(props: {
  data?: FragmentType<typeof PagePublicNoticesFragment>;
}) {
  const data = getFragmentData(PagePublicNoticesFragment, props.data);
  if (!data) return null;

  const items = 'publicNotices' in data ? data.publicNotices : null;
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
    <PageSection title="Public Notices & Announcements">
      <ul className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
        {sorted.map((notice, i) => (
          <PublicNoticeCard
            key={notice.id}
            publicNotice={notice}
            flag={i === 0}
          />
        ))}
      </ul>
    </PageSection>
  );
}
