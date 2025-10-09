import { BasePage } from '@/components/static/BasePage/BasePage';
import { PageListItems } from '@/components/static/Page';
import { PageFacilities } from '@/components/static/Page/PageFacilities/PageFacilities';
import { gql } from '@msb/js-sdk/gql';
import { notFound } from 'next/navigation';
import { getClientHandler } from '@/utils/apollo/utils';
import { GenerateMetadataFunction, getPageMeta } from '@/utils/pageHelpers';

const metaQuery = gql(`
  query GetCommunityMeta($slug: String!) {
    community(where: { slug: $slug }) {
      title
      description
    }
  }
`);

export const generateMetadata: GenerateMetadataFunction = async ({
  params,
}) => {
  const { slug } = await params;
  return getPageMeta('community', metaQuery, slug);
};

const getCommunityPage = gql(`
  query GetCommunity(
    $slug: String!
    $now: DateTime!
  ) {
    community(where: { slug: $slug }) {
      ...BasePageInfo
      ...PageMap
      boards {
        ...PageList
      }
      facilities {
        ...FacilitiesList
      }
      parks {
        ...PageList
      }
      trails {
        ...PageList
      }
    }
  }
`);

export default async function CommunityPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;

  const { data, errors, error } = await getClientHandler({
    query: getCommunityPage,
    variables: {
      slug,
      now: new Date().toISOString(),
    },
  });

  if (errors || error) {
    console.error('Error fetching community data:', errors || error);
    return notFound();
  }
  if (!data?.community) {
    console.error('Community not found for slug:', slug);
    return notFound();
  }

  const page = data.community;
  const hasSideContent =
    !!page.boards?.length ||
    !!page.facilities?.length ||
    !!page.parks?.length ||
    !!page.trails?.length;

  return (
    <BasePage
      data={page}
      rightSide={
        hasSideContent && (
          <>
            {page.boards && (
              <PageListItems items={page.boards} title="Boards" />
            )}
            {page.facilities && <PageFacilities facilities={page.facilities} />}
            {page.parks && <PageListItems items={page.parks} title="Parks" />}
            {page.trails && (
              <PageListItems items={page.trails} title="Trails" />
            )}
          </>
        )
      }
    />
  );
}
