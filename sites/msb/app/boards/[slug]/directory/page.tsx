import { PageColumnController } from '@/components/client/PageColumnController';
import { LinkButton } from '@/components/static/LinkButton';
import { BoardDirectoryDisplay } from '@/components/static/Page/BoardDirectoryDisplay';
import { ProseWrapper } from '@/components/static/ProseWrapper';
import { getClientHandler } from '@/utils/apollo/utils';
import { gql } from '@msb/js-sdk/gql';
import { notFound } from 'next/navigation';

const metaQuery = gql(`
  query GetBoardDirectoryMeta($slug: String!) {
    board(where: { slug: $slug }) {
      title
    }
  }
`);

export const generateMetadata = async ({
  params,
}: PageProps<'/boards/[slug]/directory'>) => {
  const { slug } = await params;
  try {
    const { data } = await getClientHandler({
      query: metaQuery,
      variables: { slug },
    });

    return {
      title: `MSB - ${data?.board?.title} Directory`,
      description: `Directory information for the ${data?.board?.title}.`,
    };
  } catch (error: any) {
    console.error('Apollo query failed: ', JSON.stringify(error));
    if (error.networkError?.result?.errors) {
      console.error(
        'Network error: ',
        JSON.stringify(error.networkError.result.errors, null, 2),
      );
    }
    throw error;
  }
};

const getBoardDirectoryQuery = gql(`
  query GetBoardDirectory($where: BoardWhereUniqueInput!) {
    board(where: $where) {
      title
      directoryExcel
    }
  }
`);

export default async function BoardDirectoryPage(
  props: PageProps<'/boards/[slug]/directory'>,
) {
  const { slug } = await props.params;

  const { data, error } = await getClientHandler({
    query: getBoardDirectoryQuery,
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
    <PageColumnController
      right={
        <LinkButton block href={`/boards/${slug}`} color="primary">
          Back to Board
        </LinkButton>
      }
    >
      <ProseWrapper>
        <h1 className="text-3xl">{page.title} Directory</h1>
      </ProseWrapper>
      <LinkButton
        block
        href={`/boards/${slug}`}
        color="primary"
        className="lg:hidden"
      >
        Back to Board
      </LinkButton>
      <BoardDirectoryDisplay data={page.directoryExcel} />
    </PageColumnController>
  );
}
