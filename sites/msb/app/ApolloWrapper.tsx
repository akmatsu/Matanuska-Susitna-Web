'use client';

import { makeClient } from '@/utils/apollo/utils';
import { ApolloNextAppProvider } from '@apollo/experimental-nextjs-app-support';
import React from 'react';

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
