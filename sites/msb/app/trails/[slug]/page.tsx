import { notFound } from 'next/navigation';
import {
  PageAddress,
  PageListItems,
  PageTrailInfo,
} from '@/components/static/Page';
import { gql } from '@msb/js-sdk/gql';
import { BasePage } from '@/components/static/BasePage';
import { getClientHandler } from '@/utils/apollo/utils';
import { GenerateMetadataFunction, getPageMeta } from '@/utils/pageHelpers';

const metaQuery = gql(`
  query GetTrailMeta(
    $slug: String!
  ) {
    trail(where: { slug: $slug }) {
      title
      description
    }
  }
`);

export const generateMetadata: GenerateMetadataFunction = async ({
  params,
}) => {
  const { slug } = await params;
  return getPageMeta('trail', metaQuery, slug);
};

const trailQuery = gql(`
  query GetTrail(
    $slug: String!
    $now: DateTime!
  ) {
    trail(where: { slug: $slug }) {
      ...BasePageInfo
      ...TrailInfo
      park {
        ...PageList
      }
      address {
        ...AddressFields
      }
    }
  }
`);

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const { data, error } = await getClientHandler({
    query: trailQuery,
    variables: {
      slug,
      now: new Date().toISOString(),
    },
  });

  if (error) {
    console.error('Error fetching trail data:', error);
    return notFound();
  }

  const page = data?.trail;

  if (!page) {
    console.error('Trail not found for slug:', slug);
    return notFound();
  }

  return (
    <BasePage
      data={page}
      rightSide={
        <>
          <PageAddress address={page.address} />
          <PageTrailInfo trail={page} />
          {page.park && <PageListItems items={[page.park]} title="Park" />}
        </>
      }
    />
  );
}
