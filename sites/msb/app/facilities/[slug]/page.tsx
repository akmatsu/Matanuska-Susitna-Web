import { getClient } from '@/utils/apollo/ApolloClient';
import { notFound } from 'next/navigation';
import {
  PageActions,
  PageBody,
  PageContacts,
  PageContainer,
  PageDocuments,
  PageEvents,
  PageListItems,
  PagePublicNotices,
  PageServices,
} from '@/components/static/Page';
import { PageTwoColumn } from '@/components/static/Page/PageTwoColumn';
import { Hero } from '@matsugov/ui';
import { GET_FACILITY_QUERY } from '@msb/js-sdk/getFacility';

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const { data, errors, error } = await getClient().query({
    query: GET_FACILITY_QUERY,
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
    console.error('Park not found for slug:', slug);
    return notFound();
  }

  const publicNotices = data.publicNotices;
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
          <PagePublicNotices items={publicNotices} />
          <PageEvents listName="Facility" />
        </PageTwoColumn>
      </PageContainer>
    </>
  );
}
