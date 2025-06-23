import { from, HttpLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { ApolloClient, InMemoryCache } from '@apollo/client-integration-nextjs';

export function makeClient({
  apiEndpoint = '/api/graphql',
  ...opts
}: {
  fetchOptions?: RequestInit;
  apiUrl: string;
  apiEndpoint?: string;
}) {
  const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path, extensions }) => {
        console.error(`[GraphQL error]: Message: ${message}`, {
          path,
          locations,
          operation,
          code: extensions?.code,
        });
      });
    }
    if (networkError) {
      console.error('[Network error]:', networkError, 'operation: ', operation);
    }
  });

  const httpLink = new HttpLink({
    uri: `${opts?.apiUrl}${apiEndpoint}`,

    /**
     * (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
     *
     * you can override the default `fetchOptions` on a per query basis
     * via the `context` property on the options passed as a second argument
     * to an Apollo Client data fetching hook, e.g.:
     * const { data } = useSuspenseQuery(MY_QUERY, { context: { fetchOptions: { cache: "force-cache" }}});
     */
    fetchOptions: opts?.fetchOptions,
  });

  return new ApolloClient({
    cache: new InMemoryCache({
      possibleTypes: {
        BasePage: [
          'AssemblyDistrict',
          'Community',
          'Board',
          'Facility',
          'PublicNotice',
          'Park',
          'Trail',
          'Service',
          'Facility',
          'OrgUnit',
          'BoardPage',
        ],
        BasePageWithSlug: [
          'AssemblyDistrict',
          'Community',
          'Board',
          'Facility',
          'PublicNotice',
          'Park',
          'Trail',
          'Service',
          'Facility',
          'OrgUnit',
        ],
      },
    }),
    link: from([errorLink, httpLink]),
    defaultOptions: {
      query: {
        errorPolicy: 'all', // This allows partial data to be returned even if there are errors
      },
    },
  });
}
