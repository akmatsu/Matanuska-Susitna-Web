import { PageSection } from './PageSection';
import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';
import { PublicNoticeInfo } from './PublicNoticeInfo';
import { PublicNoticeCard } from './PublicNoticeCard';

const PagePublicNoticesFragment = gql(`
  fragment PagePublicNotices on BasePageWithSlug {
    publicNotices(take: 5 orderBy: { urgency: desc }) {
      id
      ...PublicNoticeFields
    }
  }
`);

export function PagePublicNotices(props: {
  data?: FragmentType<typeof PagePublicNoticesFragment>;
}) {
  const data = getFragmentData(PagePublicNoticesFragment, props.data);

  if (!data?.publicNotices?.length) return null;

  return (
    <PageSection title="Public Notices & Announcements" noMargins>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        {data.publicNotices.map((notice, i) => (
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
