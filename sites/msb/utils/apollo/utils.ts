import { type QueryOptions, type OperationVariables } from '@msb/js-sdk/client';
import { getClient } from './ApolloClient';

export async function getClientHandler<
  T = any,
  TVariables extends OperationVariables = OperationVariables,
>(options: QueryOptions<TVariables, T>) {
  return getClient().query({
    ...options,
    context: {
      ...options.context,
      fetchOptions: {
        ...options.context?.fetchOptions,
        next: {
          revalidate: options.context?.fetchOptions?.next?.revalidate ?? 60, // Default revalidation time
          ...options.context?.fetchOptions?.next,
        },
      },
    },
  });
}
