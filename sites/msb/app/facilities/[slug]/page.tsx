import { getClient } from '@/utils/apollo/ApolloClient';
import { notFound } from 'next/navigation';
import {
  PageEvents,
  PageListItems,
  PagePublicNotices,
  PageServices,
} from '@/components/static/Page';
import { gql } from '@msb/js-sdk/gql';
import { BasePageWithActions } from '@/components/static/BasePageWithActions';

const getFacilityPage = gql(`
  query GetFacility(
    $slug: String!
    $take: Int = 5
    $orderDirection: OrderDirection = desc
  ) {
    facility(where: { slug: $slug }) {
      ...BasePageWithActionsInfo
      park {
        ...PageList
      }
      services {
        ...ServiceList
      }
      address {
        ...AddressFields
      }
      hours {
        ...HourFields
      }
    }

    publicNotices(
      where: { communities: { some: { slug: { equals: $slug } } } }
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
    query: getFacilityPage,
    variables: {
      slug,
    },
  });

  if (errors || error) {
    console.error('Error fetching community data:', errors || error);
    return notFound();
  }

  const page = data.facility;

  if (!page) {
    console.error('Facility not found for slug:', slug);
    return notFound();
  }

  const publicNotices = data.publicNotices;
  return (
    <BasePageWithActions
      rightSide={
        <>{page.park && <PageListItems items={[page.park]} title="Park" />}</>
      }
    >
      <PageServices services={page.services} />
      <PagePublicNotices items={publicNotices} />
      <PageEvents listName="Facility" />
    </BasePageWithActions>
  );
}
