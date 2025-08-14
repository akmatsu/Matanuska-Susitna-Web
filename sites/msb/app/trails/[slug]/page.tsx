import { getClient } from '@/utils/apollo/ApolloClient';
import { notFound } from 'next/navigation';
import {
  PageAddress,
  PageEvents,
  PageListItems,
  PageServices,
  PageTrailInfo,
} from '@/components/static/Page';
import { gql } from '@msb/js-sdk/gql';
import { BasePageWithActions } from '@/components/static/BasePageWithActions';

const trailQuery = gql(`
  query GetTrail(
    $slug: String!
    $take: Int = 5
    $orderDirection: OrderDirection = desc
  ) {
    trail(where: { slug: $slug }) {
      ...BasePageWithActionsInfo
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
    <BasePageWithActions
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
      <PageEvents listName="Trail" />
    </BasePageWithActions>
  );
}
