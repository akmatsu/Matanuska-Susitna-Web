import {
  PageActions,
  PageBody,
  PageChildrenOrgUnits,
  PageContacts,
  PageContainer,
  PageDocuments,
  PageEvents,
  PageParentOrgUnit,
  PagePublicNotices,
  PageServices,
} from '@/components/static/Page';
import { PageTwoColumn } from '@/components/static/Page/PageTwoColumn';
import { getClient } from '@/utils/apollo/ApolloClient';
import { Hero } from '@matsugov/ui';
import { GET_ORG_UNIT_QUERY } from '@msb/js-sdk/getOrgUnit';
import { notFound } from 'next/navigation';

export default async function DepartmentPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const { data, errors, error } = await getClient().query({
    query: GET_ORG_UNIT_QUERY,
  });

  if (errors || error) {
    console.error('Error fetching community data:', errors || error);
    return notFound();
  }

  if (!data?.orgUnit) {
    console.error('Community not found for slug:', slug);
    return notFound();
  }

  const page = data.orgUnit;
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
              <PageParentOrgUnit item={page.parent} />
              <PageChildrenOrgUnits items={page.children} />
            </>
          }
        >
          <PageBody
            body={page.body}
            title={page.title}
            description={page.description}
          />
          <PageServices services={page.services} />
          <PagePublicNotices items={publicNotices} />
          <PageEvents listName="Department" />
        </PageTwoColumn>
      </PageContainer>
    </>
  );
}
