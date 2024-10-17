import { registerApolloClient } from '@apollo/experimental-nextjs-app-support';
import { makeClient } from './makeClient';

export const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  return makeClient();
});
