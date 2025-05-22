import { makeClient } from './makeClient';
import { registerApolloClient } from '@apollo/client-integration-nextjs';

export function initApolloDevLogging() {
  if (process.env.NODE_ENV !== 'production') {
    import('@apollo/client/dev').then(
      ({ loadErrorMessages, loadDevMessages }) => {
        loadDevMessages();
        loadErrorMessages();
      },
    );
  }
}

export function registerClient(apiUrl: string) {
  return registerApolloClient(() => {
    return makeClient({ apiUrl });
  });
}
