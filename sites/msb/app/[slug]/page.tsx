import { BasePage } from '@/components/static/BasePage';
import { PageListItems } from '@/components/static/Page';
import { PageFacilities } from '@/components/static/Page/PageFacilities/PageFacilities';
import { getClientHandler } from '@/utils/apollo/utils';
import { gql } from '@msb/js-sdk/gql';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

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
      facilities {
        ...FacilitiesList
      }            
    }
  }
`);

const metaQuery = gql(`
  query GetOrTopicMeta($slug: String) {
    topic(where: { slug: $slug }) {
      title
      description
    }
  }
`);

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;

  const { data } = await getClientHandler({
    query: metaQuery,
    variables: {
      slug: params.slug,
    },
  });

  const topic = data.topic;

  return {
    title: topic ? topic.title : 'Page Not Found',
    description: topic
      ? topic.description
      : 'The page you are looking for does not exist.',
  };
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
