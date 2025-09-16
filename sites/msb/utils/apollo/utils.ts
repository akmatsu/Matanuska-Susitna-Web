import { type QueryOptions, type OperationVariables } from '@msb/js-sdk/client';
import { getClient } from './ApolloClient';
import { NEXT_DEFAULT_REVALIDATE } from '@/configs/config';

export async function getClientHandler<
  T = any,
  TVariables extends OperationVariables = OperationVariables,
>(options: QueryOptions<TVariables, T>) {
  return getClient().query({
    ...options,
    fetchPolicy: 'no-cache', // Always fetch from network
    context: {
      ...options.context,
      fetchOptions: {
        ...options.context?.fetchOptions,
        cache: 'no-store',
        next: {
          revalidate:
            options.context?.fetchOptions?.next?.revalidate ??
            NEXT_DEFAULT_REVALIDATE,
          ...options.context?.fetchOptions?.next,
        },
      },
    },
  });
}
