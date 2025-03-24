import { TypedDocumentNode } from '@msb/js-sdk/apollo';
import { getClient } from './apollo/ApolloClient';

export async function getPageMeta<
  TQuery extends TypedDocumentNode<
    any,
    { where: { slug: string } }
  > = TypedDocumentNode<any, { where: { slug: string } }>,
>(
  listName: string,
  query: TQuery,
  props: { params: Promise<{ slug: string }> },
) {
  const params = await props.params;

  const { data } = await getClient().query({
    query,
    variables: {
      where: { slug: params.slug },
    },
    context: {
      fetchOptions: {
        next: {
          revalidate: 300,
        },
      },
    },
  });

  return {
    title: `MSB - ${data?.[listName]?.title}`,
    description: data?.[listName]?.description,
  };
}
