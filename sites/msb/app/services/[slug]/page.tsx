import { BasePage } from '@/components/static/BasePage';
import { gql } from '@msb/js-sdk/gql';
import { notFound } from 'next/navigation';
import { getClientHandler } from '@/utils/apollo/utils';
import { PageListItems } from '@/components/static/Page';
import { GenerateMetadataFunction, getPageMeta } from '@/utils/pageHelpers';

const metaQuery = gql(`
  query GetServiceMeta($slug: String!) {
    service(where: { slug: $slug }) {
      title
      description
    }
  }
`);

export const generateMetadata: GenerateMetadataFunction = async ({
  params,
}) => {
  const { slug } = await params;
  return getPageMeta('service', metaQuery, slug);
};

const getService = gql(`
  query GetService($slug: String!, $now: DateTime!) {
    service(where: { slug: $slug}) {
      ...BasePageInfo
      trails {
        ...PageList
      }
      facilities {
        ...PageList
      }
      parks {
        ...PageList
      }
      boards {
        ...PageList
      } 
    }
  }
`);

export default async function ServicePage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;

  const { data, error } = await getClientHandler({
    query: getService,
    variables: {
      slug,
      now: new Date().toISOString(),
    },
  });

  if (error) {
    console.error('Error fetching service page data:', error);
    throw error;
  }

  if (!data?.service) {
    return notFound();
  }

  const page = data.service;

  return (
    <BasePage
      data={page}
      rightSide={
        <>
          <PageListItems items={page.parks} title="Parks" />
          <PageListItems items={page.trails} title="Trails" />
          <PageListItems items={page.facilities} title="Facilities" />
          <PageListItems items={page.boards} title="Boards" />
        </>
      }
    />
  );
}
