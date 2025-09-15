import { TypedDocumentNode } from '@msb/js-sdk/apollo';
import { getClientHandler } from './apollo/utils';

export async function getPageMeta<
  TQuery extends TypedDocumentNode<
    any,
    { where: { slug: string } }
  > = TypedDocumentNode<any, { where: { slug: string } }>,
>(listName: string, query: TQuery, slug: string) {
  try {
    const { data } = await getClientHandler({
      query,
      variables: {
        where: { slug },
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
