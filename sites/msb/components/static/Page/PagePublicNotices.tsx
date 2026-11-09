import { PageSection } from './PageSection';
import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';
import type { PublicNoticeSummary } from '@msb/cms-sdk';
import {
  PublicNoticeCardView,
  toPublicNoticeCardData,
  type PublicNoticeCardData,
} from './PublicNoticeCard';

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

export type PagePublicNoticeData = PublicNoticeCardData & {
  urgency: PublicNoticeSummary['urgency'] | null;
  publishAt: PublicNoticeSummary['publishAt'];
};

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

export function PagePublicNoticesView(props: {
  items?: PagePublicNoticeData[] | null;
}) {
  const items = props.items;
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
          <PublicNoticeCardView
            key={notice.id}
            publicNotice={notice}
            flag={i === 0}
          />
        ))}
      </ul>
    </PageSection>
  );
}

/** Maps the Keystone GraphQL page public notices fragment to view data. */
export function toPagePublicNoticesData(
  ref?: FragmentType<typeof PagePublicNoticesFragment>,
): PagePublicNoticeData[] | null {
  const data = getFragmentData(PagePublicNoticesFragment, ref);
  if (!data) return null;

  const items = 'publicNotices' in data ? data.publicNotices : null;
  return (
    items?.map((notice) => ({
      ...toPublicNoticeCardData(notice),
      urgency: notice.urgency ?? null,
      publishAt: typeof notice.publishAt === 'string' ? notice.publishAt : null,
    })) ?? null
  );
}

export function PagePublicNotices(props: {
  data?: FragmentType<typeof PagePublicNoticesFragment>;
}) {
  return <PagePublicNoticesView items={toPagePublicNoticesData(props.data)} />;
}
