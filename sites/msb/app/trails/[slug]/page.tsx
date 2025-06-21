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
import { Hero } from '@matsugov/ui';
import { getFragmentData, gql } from '@msb/js-sdk/gql';
import { PageTopics } from '@/components/static/Page/PageTopics';

const trailPageFragment = gql(`
  fragment TrailPage on Trail {
    id
    title
    body
    heroImage
    description
    ...TrailInfo
    topics {
      ...TopicFields
    }
    actions {
      ...ActionFields
    }
    documents {
      ...DocumentFields
    }
    park {
      ...PageList
    }
    contacts {
      ...ContactFields
    }
    address {
      ...AddressFields
    }
    services {
      ...ServiceFields
    }
  }
`);

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
      ...TrailPage 
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

  const page = getFragmentData(trailPageFragment, data.trail);

  if (!page) {
    console.error('Park not found for slug:', slug);
    return notFound();
  }

  return (
    <>
      {page.heroImage && <Hero image={page.heroImage} />}
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
              {page.park && <PageListItems items={[page.park]} />}
            </>
          }
        >
          <PageBody body={page} />
          <PageServices services={page.services} />
          <PageEvents listName="Trail" />
        </PageTwoColumn>
      </PageContainer>
    </>
  );
}
