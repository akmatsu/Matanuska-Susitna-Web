import { BasePage } from '@/components/static/BasePage';
import {
  PageChildrenOrgUnits,
  PageParentOrgUnit,
} from '@/components/static/Page';
import { getClient } from '@/utils/apollo/ApolloClient';
import { gql } from '@msb/js-sdk/gql';
import { notFound } from 'next/navigation';

const getOrgUnit = gql(`
  query GetOrgUnit(
    $slug: String!
    $now: DateTime!
  ) {
    orgUnit(where: { slug: $slug }) {
      ...BasePageInfo
      children {
        ...ChildrenOrgUnits
      }
      parent {
        ...OrgUnitFields
      }
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
      now: new Date().toISOString(),
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
    <BasePage
      data={page}
      rightSide={
        <>
          <PageParentOrgUnit item={page.parent} />
          <PageChildrenOrgUnits items={page.children} />
        </>
      }
    />
  );
}
