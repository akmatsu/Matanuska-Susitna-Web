import { HttpLink } from '@apollo/client';
import {
  ApolloClient,
  InMemoryCache,
} from '@apollo/experimental-nextjs-app-support';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function makeClient(opts?: { fetchOptions?: RequestInit }) {
  const httpLink = new HttpLink({
    uri: `${API_URL}/api/graphql`,

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
    cache: new InMemoryCache(),
    link: httpLink,
  });
}
