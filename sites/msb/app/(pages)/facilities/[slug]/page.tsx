import { notFound } from 'next/navigation';
import {
  PageAddress,
  PageHours,
  PageListItems,
} from '@/components/static/Page';
import { gql } from '@msb/js-sdk/gql';
import { BasePage } from '@/components/static/BasePage/BasePage';
import { getClientHandler } from '@/utils/apollo/utils';

import { GenerateMetadataFunction, getPageMeta } from '@/utils/pageHelpers';

const metaQuery = gql(`
  query GetFacilityMeta($slug: String!) {
    facility(where: { slug: $slug }) {
      title
      description
    }
  }
`);

export const generateMetadata: GenerateMetadataFunction = async ({
  params,
}) => {
  const { slug } = await params;
  return getPageMeta('facility', metaQuery, slug);
};

const getFacilityPage = gql(`
  query GetFacility(
    $slug: String!
    $now: DateTime!
  ) {
    facility(where: { slug: $slug }) {
      ...BasePageInfo
      park {
        ...PageList
      }
      address {
        ...AddressFields
      }
      hours {
        ...HourList
      }
    }
  }
`);

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const { data, error } = await getClientHandler({
    query: getFacilityPage,
    variables: {
      slug,
      now: new Date().toISOString(),
    },
  });

  if (error) {
    console.error('Error fetching community data:', error);
    return notFound();
  }

  const page = data?.facility;

  if (!page) {
    console.error('Facility not found for slug:', slug);
    return notFound();
  }

  return (
    <BasePage
      data={page}
      rightSide={
        <>
          <PageAddress address={page.address} />
          <PageHours hours={page.hours} />
          {page.park && <PageListItems items={[page.park]} title="Parks" />}
        </>
      }
    />
  );
}
