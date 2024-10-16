'use client';

import React from 'react';
import { ApolloNextAppProvider } from '@apollo/experimental-nextjs-app-support';
import { makeClient } from '@/utils/apollo/makeClient';

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
