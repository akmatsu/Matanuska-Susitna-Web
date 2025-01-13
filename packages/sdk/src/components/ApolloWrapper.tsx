'use client';
import React from 'react';
import { ApolloNextAppProvider } from '@apollo/experimental-nextjs-app-support';
import { makeClient } from '../client/makeClient';

export function ApolloWrapper({
  children,
  apiUrl,
}: React.PropsWithChildren<{ apiUrl: string }>) {
  return (
    <ApolloNextAppProvider makeClient={() => makeClient({ apiUrl })}>
      {children}
    </ApolloNextAppProvider>
  );
}
