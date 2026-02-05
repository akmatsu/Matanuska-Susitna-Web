import { BasePage } from '@/components/static/BasePage';
import { PageListItems } from '@/components/static/Page';
import { PageFacilities } from '@/components/static/Page/PageFacilities/PageFacilities';
import { getClientHandler } from '@/utils/apollo/utils';
import { gql } from '@msb/js-sdk/gql';
import { notFound } from 'next/navigation';
import { GenerateMetadataFunction, getPageMeta } from '@/utils/pageHelpers';

const metaQuery = gql(`
  query GetTopicMeta($slug: String!) {
    topic(where: { slug: $slug }) {
      title
      description
    }
  }
`);

export const generateMetadata: GenerateMetadataFunction = async ({
  params,
}) => {
  const { slug } = await params;
  return getPageMeta('topic', metaQuery, slug);
};

const query = gql(`
  query GetTopicPage($slug: String, $now: DateTime!) {
    topic(where: { slug: $slug }) {
      ...BasePageInfo 
      boards {
        ...PageList
      }
      trails {
        ...PageList
      }
      parks {
        ...PageList
      }
      facilities(orderBy:  {
         title: asc
      }) {
        ...FacilitiesList
      }            
    }
  }
`);

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function page(props: Props) {
  const params = await props.params;

  const { data } = await getClientHandler({
    query,
    variables: {
      slug: params.slug,
      now: new Date().toISOString(),
    },
  });

  const topic = data?.topic;

  if (!topic) return notFound();

  return (
    <BasePage
      data={topic}
      rightSide={
        <>
          <PageFacilities facilities={topic.facilities} />
          <PageListItems items={topic.trails} title="Trails" />
          <PageListItems items={topic.parks} title="Parks" />
        </>
      }
    >
      <PageListItems items={topic.boards} title="Boards" />
    </BasePage>
  );
}
