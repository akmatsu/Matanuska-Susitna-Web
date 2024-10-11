import { HttpLink } from '@apollo/client';
import {
  ApolloClient,
  InMemoryCache,
} from '@apollo/experimental-nextjs-app-support';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function makeClient() {
  const httpLink = new HttpLink({
    uri: `${API_URL}/api/graphql`,
    fetchOptions: { cache: 'no-store' },
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
  });
}
