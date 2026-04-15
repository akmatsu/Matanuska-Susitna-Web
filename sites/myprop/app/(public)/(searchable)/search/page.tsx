import { Suspense } from 'react';
import { SearchResults } from './SearchResults';
import { SearchResultLoading } from './SearchResultLoading';

export default async function SearchPage() {
  return (
    <>
      <h1 className="text-center text-xl font-bold">Search Results</h1>
      <Suspense fallback={<SearchResultLoading />}>
        <SearchResults />
      </Suspense>
    </>
  );
}
