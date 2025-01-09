import { registerApolloClient } from '@apollo/experimental-nextjs-app-support';
import { makeClient } from './makeClient';

export function registerClient(apiUrl: string) {
  return registerApolloClient(() => {
    return makeClient({ apiUrl });
  });
}
