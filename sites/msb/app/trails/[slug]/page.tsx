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
import { GET_TRAIL_QUERY } from '@msb/js-sdk';

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const { data, errors, error } = await getClient().query({
    query: GET_TRAIL_QUERY,
    variables: {
      slug,
    },
  });

  if (errors || error) {
    console.error('Error fetching community data:', errors || error);
    return notFound();
  }

  const page = data.trail;

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
              <PageListItems items={page.topics} title="Topics" />
            </>
          }
        >
          <PageBody
            title={page.title}
            body={page.body}
            description={page.description}
          />
          <PageServices services={page.services} />
          <PageEvents listName="Trail" />
        </PageTwoColumn>
      </PageContainer>
    </>
  );
}
