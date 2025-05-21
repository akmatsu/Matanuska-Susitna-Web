import { makeClient } from './makeClient';

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

export async function registerClient(apiUrl: string) {
  if (typeof window === 'undefined') {
    const { registerApolloClient } = await import(
      '@apollo/client-integration-nextjs'
    );
    return registerApolloClient(() => {
      return makeClient({ apiUrl });
    });
  }
}
