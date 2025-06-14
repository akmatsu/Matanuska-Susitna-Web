import { getClient } from '@/utils/apollo/ApolloClient';
import { GET_PARK_QUERY } from '@msb/js-sdk/getPark';
import { notFound } from 'next/navigation';
import {
  PageActions,
  PageAddress,
  PageBody,
  PageContacts,
  PageContainer,
  PageDocuments,
  PageEvents,
  PageHours,
  PageListItems,
  PagePublicNotices,
  PageServices,
} from '@/components/static/Page';
import { PageTwoColumn } from '@/components/static/Page/PageTwoColumn';
import { Hero } from '@matsugov/ui';

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const { data, errors, error } = await getClient().query({
    query: GET_PARK_QUERY,
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
    <>
      {page.heroImage && <Hero image={page.heroImage} />}
      <PageContainer className="relative">
        <PageTwoColumn
          rightSide={
            <>
              <PageActions actions={page.actions} />
              <PageDocuments documents={page.documents} />
              <PageAddress address={page.address} />
              <PageHours hours={page.hours} />
              <PageContacts contacts={page.contacts} />
              <PageListItems items={page.trails} title="Trails" />
              <PageListItems items={page.facilities} title="Facilities" />
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
          <PageEvents listName="Park" />
        </PageTwoColumn>
      </PageContainer>
    </>
  );
}
