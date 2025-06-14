import { getClient } from '@/utils/apollo/ApolloClient';
import { notFound } from 'next/navigation';
import {
  PageActions,
  PageBody,
  PageContacts,
  PageContainer,
  PageDocuments,
  PageListItems,
  PageServices,
} from '@/components/static/Page';
import { PageTwoColumn } from '@/components/static/Page/PageTwoColumn';
import { Hero } from '@matsugov/ui';
import { GET_PUBLIC_NOTICE } from '@msb/js-sdk/getPublicNotice';

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const { data, errors, error } = await getClient().query({
    query: GET_PUBLIC_NOTICE,
    variables: {
      slug,
    },
  });

  if (errors || error) {
    console.error('Error fetching community data:', errors || error);
    return notFound();
  }

  const page = data.publicNotice;

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

              <PageListItems items={page.facilities} title="Facilities" />
              <PageListItems items={page.parks} title="Parks" />
              <PageListItems items={page.trails} title="Trails" />
              <PageListItems items={page.boards} title="Boards" />
              <PageListItems
                items={page.orgUnits}
                title="Departments & Divisions"
              />
              <PageListItems
                items={page.assemblyDistricts}
                title="Assembly Districts"
              />
              <PageListItems items={page.topics} title="Topics" />
              <PageListItems items={page.communities} title="Communities" />
            </>
          }
        >
          <PageBody
            title={page.title}
            body={page.body}
            description={page.description}
          />
          <PageServices services={page.services} />
        </PageTwoColumn>
      </PageContainer>
    </>
  );
}
