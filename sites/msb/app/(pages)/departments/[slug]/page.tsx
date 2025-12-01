import { BasePage } from '@/components/static/BasePage/BasePage';
import {
  PageChildrenOrgUnits,
  PageListItems,
  PageParentOrgUnit,
} from '@/components/static/Page';
import { gql } from '@msb/js-sdk/gql';
import { notFound } from 'next/navigation';
import { getClientHandler } from '@/utils/apollo/utils';

import { GenerateMetadataFunction, getPageMeta } from '@/utils/pageHelpers';

const metaQuery = gql(`
  query GetOrgUnitMeta($slug: String!) {
    orgUnit(where: { slug: $slug }) {
      title
      description
    }
  }
`);

export const generateMetadata: GenerateMetadataFunction = async ({
  params,
}) => {
  const { slug } = await params;
  return getPageMeta('orgUnit', metaQuery, slug);
};

const getOrgUnit = gql(`
  query GetOrgUnit(
    $slug: String!
    $now: DateTime!
  ) {
    orgUnit(where: { slug: $slug }) {
      ...BasePageInfo
      showPage
      children {
        ...ChildrenOrgUnits
      }
      parent {
        ...OrgUnitFields
      }
      parks {
        ...PageList
      }
      facilities {
        ...PageList
      }
      trails {
        ...PageList
      }
      boards {
        ...PageList
      }
    }
  }
  `);

export default async function DepartmentPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const { data, error } = await getClientHandler({
    query: getOrgUnit,
    variables: {
      slug,
      now: new Date().toISOString(),
    },
  });

  if (error) {
    console.error('Error fetching org unit data:', error);
    return notFound();
  }

  if (!data?.orgUnit || data.orgUnit?.showPage === 'no') {
    console.error('Org Unit not found for slug:', slug);
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
          <PageListItems items={page.facilities} title="Facilities" />
          <PageListItems items={page.parks} title="Parks" />
          <PageListItems items={page.trails} title="Trails" />
          <PageListItems items={page.boards} title="Boards" />
        </>
      }
    />
  );
}
