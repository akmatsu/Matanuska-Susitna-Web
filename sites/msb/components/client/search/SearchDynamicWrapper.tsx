'use client';
import dynamic from 'next/dynamic';

const InstantSearchAutoComplete = dynamic(
  () =>
    import('./InstantSearchAutoComplete').then(
      (mod) => mod.InstantSearchAutoComplete,
    ),
  {
    ssr: false,
  },
);

export function SearchDynamicWrapper() {
  return <InstantSearchAutoComplete />;
}
