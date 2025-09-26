import { TypedDocumentNode } from '@msb/js-sdk/apollo';
import { getClientHandler } from './apollo/utils';
import { Exact } from '@msb/js-sdk/graphql';
import { Metadata } from 'next';

export type GenerateMetadataFunction = (args: {
  params: Promise<{ slug: string }>;
}) => Promise<Metadata>;

export async function getPageMeta<
  TQuery extends TypedDocumentNode<any, any> = TypedDocumentNode<
    any,
    Exact<{ slug: string }>
  >,
>(listName: string, query: TQuery, slug: string): Promise<Metadata> {
  try {
    const { data } = await getClientHandler({
      query,
      variables: {
        slug,
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
