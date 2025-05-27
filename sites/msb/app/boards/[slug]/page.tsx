import { PageSideNavController } from '@/components/client/Page/PageSideNavController';
import { PageBody, PageEvents, PageSidebar } from '@/components/static/Page';
import { PageContainer } from '@/components/static/Page/PageContainer';
import { getClient } from '@/utils/apollo/ApolloClient';
import { getPageMeta } from '@/utils/pageHelpers';
import { Hero } from '@matsugov/ui';
import { GET_BOARD, GET_BOARD_META } from '@msb/js-sdk/getBoard';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> => {
  const { slug } = await params;
  return getPageMeta('board', GET_BOARD_META, slug);
};

export default async function BoardPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const listName = 'board';

  const { data, error } = await getClient().query({
    query: GET_BOARD,
    variables: {
      where: { slug },
    },
  });

  if (error) {
    console.error('Apollo query failed: ', JSON.stringify(error));
    throw error;
  }

  const page = data?.board;

  if (!page) {
    console.error('Board not found for slug:', slug);
    return notFound();
  }

  return (
    <>
      {page.heroImage && <Hero image={page.heroImage} />}
      <PageContainer>
        <PageSideNavController
          rightSide={<PageSidebar page={page} listName={listName} />}
        >
          <PageBody
            title={page.title}
            description={page.description}
            body={page.body}
            pageType={page.__typename}
          />
          <PageEvents listName={listName} />
        </PageSideNavController>
      </PageContainer>
    </>
  );
}
