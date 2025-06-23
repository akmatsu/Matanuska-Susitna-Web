import { PageMap } from '@/components/client/Page/PageMap';
import {
  PageActions,
  PageBody,
  PageContacts,
  PageContainer,
  PageDistricts,
  PageDocuments,
  PageEvents,
  PagePublicNotices,
  PageServices,
} from '@/components/static/Page';
import { PageHeroImage } from '@/components/static/Page/PageHeroImage';
import { PageTwoColumn } from '@/components/static/Page/PageTwoColumn';
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
      ...PageBody
      ...HeroImage
      ...PageMap
      boards {
        ...PageList
      }
      topics {
        ...TopicFields
      }
      documents {
        ...DocumentList
      }
      actions {
        ...ActionList
      }
      services {
        ...ServiceList
      }
      contacts {
        ...ContactList
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
    <>
      <PageHeroImage page={page} />
      <PageContainer className="relative">
        <PageTwoColumn
          rightSide={
            <>
              <PageMap page={page} />
              <PageActions actions={page.actions} />
              <PageDocuments documents={page.documents} />
              <PageContacts contacts={page.contacts} />
              <PageDistricts items={page.districts} />
            </>
          }
        >
          <PageBody page={page} />
          <PageServices services={page.services} />
          <PagePublicNotices items={publicNotices} />
          <PageEvents listName="Community" />
        </PageTwoColumn>
      </PageContainer>
    </>
  );
}
