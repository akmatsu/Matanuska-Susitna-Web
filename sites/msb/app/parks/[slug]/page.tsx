import { getClient } from '@/utils/apollo/ApolloClient';
import { notFound } from 'next/navigation';
import {
  PageAddress,
  PageEvents,
  PageHours,
  PageListItems,
  PagePublicNotices,
  PageServices,
} from '@/components/static/Page';
import { gql } from '@msb/js-sdk/gql';
import { BasePageWithActions } from '@/components/static/BasePageWithActions';

const getPark = gql(`
  query GetPark(
    $slug: String!
    $take: Int = 5
    $orderDirection: OrderDirection = desc
  ) {
    park(where: { slug: $slug }) {
      ...BasePageWithActionsInfo
      services {
        ...ServiceList
      }
      address {
        ...AddressFields
      }
      hours {
        ...HourList
      }
      trails {
        ...PageList
      }
      facilities {
        ...PageList
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
    query: getPark,
    variables: {
      slug,
    },
  });

  if (errors || error) {
    console.error('Error fetching community data:', errors || error);
    return notFound();
  }

  const page = data.park;

  if (!page) {
    console.error('Park not found for slug:', slug);
    return notFound();
  }

  const publicNotices = data.publicNotices;

  return (
    <BasePageWithActions
      pageContainerProps={{ className: 'relative' }}
      rightSide={
        <>
          <PageAddress address={page.address} />
          <PageHours hours={page.hours} />
          <PageListItems items={page.trails} title="Trails" />
          <PageListItems items={page.facilities} title="Facilities" />
        </>
      }
    >
      <PageServices services={page.services} />
      <PagePublicNotices items={publicNotices} />
      <PageEvents listName="Park" />
    </BasePageWithActions>
  );
}
