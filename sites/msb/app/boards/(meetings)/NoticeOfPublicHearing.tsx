import { LinkButton } from '@/components/static/LinkButton';
import { getClientHandler } from '@/utils/apollo/utils';
import { Callout } from '@matsugov/ui';
import { gql } from '@msb/js-sdk/gql';

const query = gql(`
  query GetNoticeOfPublicHearing($date: DateTime!) {
    publicNotices(orderBy:  {
       publishAt: desc
    },where:  {
      OR: [
        {
          unpublishAt: {
            gte: $date
          }
        },
      ]
       type:  {
          equals: "AKMATSUGOV_ASSEMBLY"
       }
    }) {
      id
      title
      description
      slug
      unpublishAt
      effectiveDate
      endDate
    }
  }
`);

export async function NoticeOfPublicHearing() {
  const { data, error } = await getClientHandler({
    query,
    variables: {
      date: new Date().toISOString(),
    },
  });
  if (error) return <p>Error loading public notices: {error.message}</p>;
  if (data?.publicNotices?.length) {
    const notice = data.publicNotices[0];
    return (
      <Callout color="info" className="not-prose space-y-4">
        <p className="text-xl font-bold">
          <span
            className="icon-[mdi--announcement] mr-2 -mb-1 size-6"
            aria-hidden="true"
          />
          {notice.title}
        </p>
        <p>{notice.description}</p>
        {/* <div className="flex justify-end"> */}
        <LinkButton href={`/public-notices/${notice.slug}`} color="primary">
          Learn More
        </LinkButton>
        {/* </div> */}
      </Callout>
    );
  }
}
