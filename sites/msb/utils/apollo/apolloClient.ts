import { registerApolloClient } from '@apollo/experimental-nextjs-app-support';
import { makeClient } from './utils';

export const { getClient, query, PreloadQuery } =
  registerApolloClient(makeClient);
