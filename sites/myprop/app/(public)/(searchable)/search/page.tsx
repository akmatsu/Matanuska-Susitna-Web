import { Suspense } from 'react';
import { SearchResults } from './SearchResults';
import { SearchResultLoading } from './SearchResultLoading';

export default async function SearchPage() {
  return (
    <main>
      <div className="mx-auto max-w-4xl p-6">
        <h1 className="text-center text-xl font-bold">Search Results</h1>
        <Suspense fallback={<SearchResultLoading />}>
          <SearchResults />
        </Suspense>
      </div>
    </main>
  );
}
