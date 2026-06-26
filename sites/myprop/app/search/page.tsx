import { Suspense } from 'react';
import { Results } from './Results';
import { ResultsLoading } from './ResultsLoading';
import { SearchField } from '@/components/SearchField';

export const metadata = {
  title: 'MyProperty - Search',
  description:
    'Search for real property information in the Matanuska-Susitna Borough with myProperty. Access parcel data, ownership details, assessments, and maps.',
};

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
