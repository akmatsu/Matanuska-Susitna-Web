import { Suspense } from 'react';
import { SearchFieldLoaded } from './SearchFieldLoaded';
import { SearchFieldBody } from './SearchFieldBody';

export function SearchField() {
  return (
    <Suspense fallback={<SearchFieldBody />}>
      <SearchFieldLoaded />
    </Suspense>
  );
}
