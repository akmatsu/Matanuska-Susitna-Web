import { ApolloLink } from '@apollo/client';
import {
  CombinedGraphQLErrors,
  CombinedProtocolErrors,
} from '@apollo/client/errors';
import { ErrorLink } from '@apollo/client/link/error';
import { HttpLink } from '@apollo/client/link/http';
import { ApolloClient, InMemoryCache } from '@apollo/client-integration-nextjs';

export function makeClient({
  apiEndpoint = '/api/graphql',
  ...opts
}: {
  fetchOptions?: RequestInit;
  apiUrl: string;
  apiEndpoint?: string;
}) {
  const errorLink = new ErrorLink(({ error, operation }) => {
    if (CombinedGraphQLErrors.is(error)) {
      error.errors.forEach(({ message, locations, path, extensions }) => {
        console.error(`[GraphQL error]: Message: ${message}`, {
          path,
          locations,
          operation,
          code: extensions?.code,
        });
      });
    } else if (CombinedProtocolErrors.is(error)) {
      console.error('[Protocol error]:', error, 'operation: ', operation);
    } else {
      console.error(`[Network error]: ${error}`);
    }
  });

  const httpLink = new HttpLink({
    uri: `${opts?.apiUrl}${apiEndpoint}`,
    credentials: 'include',

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
          'OrgUnit',
          'BoardPage',
          'ElectionsPage',
          'Topic',
          'Event',
          'Plan',
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
          'OrgUnit',
          'Topic',
          'Event',
          'Plan',
        ],
        BasePageWithActions: [
          'AssemblyDistrict',
          'Community',
          'Board',
          'Facility',
          'PublicNotice',
          'Park',
          'Trail',
          'OrgUnit',
          'Topic',
          'Event',
          'Plan',
        ],
      },
    }),

    link: ApolloLink.from([httpLink, errorLink]),

    defaultOptions: {
      query: {
        errorPolicy: 'all', // This allows partial data to be returned even if there are errors
      },
    },
  });
}
