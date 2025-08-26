import { getClient } from '@/utils/apollo/ApolloClient';
import { notFound } from 'next/navigation';
import {
  PageAddress,
  PageListItems,
  PageServices,
  PageTrailInfo,
} from '@/components/static/Page';
import { gql } from '@msb/js-sdk/gql';
import { BasePage } from '@/components/static/BasePage';

const trailQuery = gql(`
  query GetTrail(
    $slug: String!
    $take: Int = 5
    $orderDirection: OrderDirection = desc
    $now: DateTime!
  ) {
    trail(where: { slug: $slug }) {
      ...BasePageInfo
      ...TrailInfo
      park {
        ...PageList
      }
      address {
        ...AddressFields
      }
      services {
        ...ServiceList
      }
    }
    publicNotices(
      where: { trails: { some: { slug: { equals: $slug } } } }
      take: $take
      orderBy: { urgency: $orderDirection }
    ) {
      ...PublicNoticeList
    }
  }
`);

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const { data, errors, error } = await getClient().query({
    query: trailQuery,
    variables: {
      slug,
      now: new Date().toISOString(),
    },
  });

  if (errors || error) {
    console.error('Error fetching trail data:', errors || error);
    return notFound();
  }

  const page = data.trail;

  if (!page) {
    console.error('Park not found for slug:', slug);
    return notFound();
  }

  return (
    <BasePage
      data={page}
      rightSide={
        <>
          <PageAddress address={page.address} />
          <PageTrailInfo trail={page} />
          {page.park && <PageListItems items={[page.park]} title="Park" />}
        </>
      }
    >
      <PageServices services={page.services} />
    </BasePage>
  );
}
