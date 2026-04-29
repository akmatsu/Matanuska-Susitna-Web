import { SearchField } from '@/components/SearchField';
import { PageTitle } from '@/components/PageTitle';
import { Suspense } from 'react';
import { SearchResultLoading } from './SearchResults/SearchResultLoading';
import { SearchResultsLoaded } from './SearchResults/SearchResultsLoaded';

export default function SearchPage() {
  return (
    <main>
      <PageTitle title="Parcel Search" />
      <SearchField />
      <Suspense fallback={<SearchResultLoading />}>
        <SearchResultsLoaded />
      </Suspense>
    </main>
  );
}
