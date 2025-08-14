import { PageMap } from '@/components/client/Page/PageMap';
import { BasePageWithActions } from '@/components/static/BasePageWithActions';
import {
  PageDistricts,
  PageEvents,
  PagePublicNotices,
  PageServices,
} from '@/components/static/Page';
import { getClient } from '@/utils/apollo/ApolloClient';
import { gql } from '@msb/js-sdk/gql';
import { notFound } from 'next/navigation';

const getCommunityPage = gql(`
  query GetCommunity(
    $slug: String!
    $take: Int = 5
    $orderDirection: OrderDirection = desc
  ) {
    community(where: { slug: $slug }) {
      ...BasePageWithActionsInfo
      ...PageMap
      boards {
        ...PageList
      }
      services {
        ...ServiceList
      }
      districts {
        ...DistrictList      
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

export default async function CommunityPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;

  const { data, errors, error } = await getClient().query({
    query: getCommunityPage,
    variables: {
      slug,
    },
  });

  if (errors || error) {
    console.error('Error fetching community data:', errors || error);
    return notFound();
  }
  if (!data?.community) {
    console.error('Community not found for slug:', slug);
    return notFound();
  }

  const page = data.community;
  const publicNotices = data.publicNotices;
  return (
    <BasePageWithActions
      data={page}
      mapSlot={<PageMap page={page} />}
      rightSide={<PageDistricts items={page.districts} />}
    >
      <PageServices services={page.services} />
      <PagePublicNotices items={publicNotices} />
      <PageEvents listName="Community" />
    </BasePageWithActions>
  );
}
