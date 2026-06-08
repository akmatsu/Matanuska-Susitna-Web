'use client';
import dynamic from 'next/dynamic';

const Autocomplete = dynamic(
  () => import('./Autocomplete').then((mod) => mod.Autocomplete),
  {
    ssr: false,
  },
);

export function SearchDynamicWrapper() {
  return <Autocomplete autoFocus variant="home" />;
}
