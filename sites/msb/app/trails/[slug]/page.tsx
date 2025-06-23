import { getClient } from '@/utils/apollo/ApolloClient';
import { notFound } from 'next/navigation';
import {
  PageActions,
  PageAddress,
  PageBody,
  PageContacts,
  PageContainer,
  PageDocuments,
  PageEvents,
  PageListItems,
  PageServices,
  PageTrailInfo,
} from '@/components/static/Page';
import { PageTwoColumn } from '@/components/static/Page/PageTwoColumn';
import { gql } from '@msb/js-sdk/gql';
import { PageTopics } from '@/components/static/Page/PageTopics';
import { PageHeroImage } from '@/components/static/Page/PageHeroImage';

const trailMetaQuery = gql(`
  query GetTrailMeta($slug: String!) {
    trail(where: { slug: $slug }) {
      title
      description
    }
  }
`);

const trailQuery = gql(`
  query GetTrail(
    $slug: String!
    $take: Int = 5
    $orderDirection: OrderDirection = desc
  ) {
    trail(where: { slug: $slug }) {
      ...PageBody
      ...HeroImage
      ...TrailInfo
      topics {
        ...TopicList
      }
      actions {
        ...ActionList
      }
      documents {
        ...DocumentList
      }
      park {
        ...PageList
      }
      contacts {
        ...ContactList
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
    <>
      <PageHeroImage page={page} />
      <PageContainer className="relative">
        <PageTwoColumn
          rightSide={
            <>
              <PageActions actions={page.actions} />
              <PageDocuments documents={page.documents} />
              <PageContacts contacts={page.contacts} />
              <PageAddress address={page.address} />
              <PageTrailInfo trail={page} />
              <PageTopics topics={page.topics} />
              {page.park && <PageListItems items={[page.park]} title="Park" />}
            </>
          }
        >
          <PageBody page={page} />
          <PageServices services={page.services} />
          <PageEvents listName="Trail" />
        </PageTwoColumn>
      </PageContainer>
    </>
  );
}
