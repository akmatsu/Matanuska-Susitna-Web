import { BasePage } from '@/components/static/BasePage';
import { PageListItems } from '@/components/static/Page';
import { PageFacilities } from '@/components/static/Page/PageFacilities/PageFacilities';
import { getClientHandler } from '@/utils/apollo/utils';
import { gql } from '@msb/js-sdk/gql';
import { notFound, redirect } from 'next/navigation';

const query = gql(`
  query GetTopicPageDraft($id: ID!, $now: DateTime!) {
    topicDraft(where: { id: $id }) {
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

export const metadata = {
  title: 'Topic Draft',
  description: 'Preview draft of a topic page',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function page(props: PageProps<'/[slug]/draft'>) {
  const params = await props.params;
  const searchParams = await props.searchParams;

  function normalizeId(id: string | string[] | undefined): string {
    if (Array.isArray(id)) {
      return id[0];
    }

    if (typeof id !== 'string') redirect(`/${params.slug}`);

    return id;
  }

  const id = normalizeId(searchParams.id);
  const { data } = await getClientHandler({
    query,
    variables: {
      id,
      now: new Date().toISOString(),
    },
  });
  const topic = data?.topicDraft;
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
