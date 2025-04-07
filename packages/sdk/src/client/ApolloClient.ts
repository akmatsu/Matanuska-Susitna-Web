import { registerApolloClient } from '@apollo/experimental-nextjs-app-support';
import { makeClient } from './makeClient';

if (process.env.NODE_ENV !== 'production') {
  import('@apollo/client/dev').then(
    ({ loadErrorMessages, loadDevMessages }) => {
      loadDevMessages();
      loadErrorMessages();
    },
  );
}

export function registerClient(apiUrl: string) {
  return registerApolloClient(() => {
    return makeClient({ apiUrl });
  });
}
