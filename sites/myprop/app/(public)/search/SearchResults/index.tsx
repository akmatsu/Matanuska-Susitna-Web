import { Suspense } from 'react';
import { SearchResultsLoaded } from './SearchResultsLoaded';
import { SearchResultLoading } from './SearchResultLoading';

export function SearchResults() {
  return (
    <Suspense fallback={<SearchResultLoading />}>
      <SearchResultsLoaded />
    </Suspense>
  );
}
