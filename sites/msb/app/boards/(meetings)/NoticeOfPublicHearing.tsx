import { getClientHandler } from '@/utils/apollo/utils';
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
        {
          unpublishAt: {
            equals: null
          }
        }
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
      <ul>
        <li key={notice.id}>
          <h3>{notice.title}</h3>
          <p>{notice.description}</p>
          <p>Slug: {notice.slug}</p>
        </li>
      </ul>
    );
  }
}
