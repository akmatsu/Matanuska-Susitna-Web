import { Suspense } from 'react';
import { SearchResults } from './components/SearchResults';

export default async function SearchPage() {
  return (
    <main>
      <div className="mx-auto max-w-4xl p-6">
        <h1 className="text-center text-xl font-bold">Search Results</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <SearchResults />
        </Suspense>

        {/* <p className="mt-4 text-center text-gray-600">
          Search results are currently unavailable. Please check back later.
        </p> */}
      </div>
    </main>
  );
}
