import { notFound } from 'next/navigation';
import { PageListItems } from '@/components/static/Page';
import { gql } from '@msb/js-sdk/gql';
import { BasePage } from '@/components/static/BasePage';
import { getClientHandler } from '@/utils/apollo/utils';
import { GenerateMetadataFunction, getPageMeta } from '@/utils/pageHelpers';

const metaQuery = gql(`
  query GetPublicNoticeMeta($slug: String!) {
    publicNotice(where: { slug: $slug }) {
      title
      description
    }
  }
`);

export const generateMetadata: GenerateMetadataFunction = async ({
  params,
}) => {
  const { slug } = await params;
  return getPageMeta('publicNotice', metaQuery, slug);
};

const getPage = gql(`
  query GetPublicNotice($slug: String!, $now: DateTime!) {
    publicNotice(where: { slug: $slug }) {
      ...BasePageInfo
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

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const { data, error } = await getClientHandler({
    query: getPage,
    variables: {
      slug,
      now: new Date().toISOString(),
    },
  });

  if (error) {
    console.error('Error fetching community data:', error);
    return notFound();
  }

  if (!data?.publicNotice) {
    console.error('Public notice not found for slug:', slug);
    return notFound();
  }

  const page = data.publicNotice;

  return (
    <BasePage
      data={page}
      pageContainerProps={{ className: 'relative' }}
      rightSide={
        <>
          <PageListItems items={page.facilities} title="Facilities" />
          <PageListItems items={page.parks} title="Parks" />
          <PageListItems items={page.trails} title="Trails" />
          <PageListItems items={page.boards} title="Boards" />
        </>
      }
    />
  );
}
