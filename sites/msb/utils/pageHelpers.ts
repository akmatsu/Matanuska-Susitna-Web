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
  try {
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
}
