import { BasePageWithActions } from '@/components/static/BasePageWithActions';
import {
  PageChildrenOrgUnits,
  PageEvents,
  PageParentOrgUnit,
  PagePublicNotices,
  PageServices,
} from '@/components/static/Page';
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
      ...BasePageWithActionsInfo
      children {
        ...ChildrenOrgUnits
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
    <BasePageWithActions
      data={page}
      rightSide={
        <>
          <PageParentOrgUnit item={page.parent} />
          <PageChildrenOrgUnits items={page.children} />
        </>
      }
    >
      <PageServices services={page.services} />
      <PagePublicNotices items={data.publicNotices} />
      <PageEvents listName="Department" />
    </BasePageWithActions>
  );
}
