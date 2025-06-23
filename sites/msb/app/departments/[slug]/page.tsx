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
import { PageHeroImage } from '@/components/static/Page/PageHeroImage';
import { PageTwoColumn } from '@/components/static/Page/PageTwoColumn';
import { getClient } from '@/utils/apollo/ApolloClient';
import { gql } from '@msb/js-sdk/gql';
import { notFound } from 'next/navigation';

const getOrgUnit = gql(`
  query GetOrgUnit(
    $slug: String!
    $take: Int = 5
    $orderDirection: OrderDirection = desc
  ) {
    orgUnit(where: { slug: $slug }) {
      ...PageBody
      ...HeroImage
      actions {
        ...ActionList
      }
      documents {
        ...DocumentList
      }
      topics {
        ...TopicFields
      }
      children {
        ...ChildrenOrgUnits
      }
      contacts {
        ...ContactList
      }
      parent {
        ...OrgUnitFields
      }
      services {
        ...ServiceList
      }
    }
    publicNotices(
      where: { orgUnits: { some: { slug: { equals: $slug } } } }
      take: $take
      orderBy: { urgency: $orderDirection }
    ) {
      ...PublicNoticeList
    }
  }
  `);

export default async function DepartmentPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const { data, errors, error } = await getClient().query({
    query: getOrgUnit,
    variables: {
      slug,
    },
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
              <PageParentOrgUnit item={page.parent} />
              <PageChildrenOrgUnits items={page.children} />
            </>
          }
        >
          <PageBody page={page} />
          <PageServices services={page.services} />
          <PagePublicNotices items={data.publicNotices} />
          <PageEvents listName="Department" />
        </PageTwoColumn>
      </PageContainer>
    </>
  );
}
