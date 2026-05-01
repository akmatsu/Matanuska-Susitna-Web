import { Suspense } from 'react';
import { Results } from './Results';
import { ResultsLoading } from './ResultsLoading';
import { SearchField } from '@/components/SearchField';

export default async function SearchPage(props: PageProps<'/search'>) {
  const searchParams = await props.searchParams;

  return (
    <>
      <SearchField />
      <Suspense
        fallback={<ResultsLoading />}
        key={`results-${searchParams.query}-${searchParams.mode}`}
      >
        <Results searchParams={searchParams} />
      </Suspense>
    </>
  );
}
