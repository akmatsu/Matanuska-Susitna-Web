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
  query GetParkMeta($slug: String!) {
    park(where: { slug: $slug }) {
      title
      description
    }
  }
`);

export const generateMetadata: GenerateMetadataFunction = async ({
  params,
}) => {
  const { slug } = await params;
  return getPageMeta('park', metaQuery, slug);
};

const getPark = gql(`
  query GetPark(
    $slug: String!
    $now: DateTime!
  ) {
    park(where: { slug: $slug }) {
      ...BasePageInfo
      address {
        ...AddressFields
      }
      hours {
        ...HourList
      }
      trails {
        ...PageList
      }
      facilities {
        ...PageList
      }
    }
  }
`);

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const { data, error } = await getClientHandler({
    query: getPark,
    variables: {
      slug,
      now: new Date().toISOString(),
    },
  });

  if (error) {
    console.error('Error fetching community data:', error);
    return notFound();
  }

  if (!data?.park) {
    console.error('Park not found for slug:', slug);
    return notFound();
  }

  const page = data.park;

  return (
    <BasePage
      data={page}
      pageContainerProps={{ className: 'relative' }}
      rightSide={
        <>
          <PageAddress address={page.address} />
          <PageHours hours={page.hours} />
          <PageListItems items={page.trails} title="Trails" />
          <PageListItems items={page.facilities} title="Facilities" />
        </>
      }
    />
  );
}
