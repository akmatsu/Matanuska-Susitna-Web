import { Suspense } from 'react';
import { SearchFieldLoaded } from './SearchFieldLoaded';
import { SearchFieldBody } from './SearchFieldBody';

export function SearchField(props: {
  searchParams?: Promise<Record<string, string | string[]>>;
}) {
  return (
    <Suspense fallback={<SearchFieldBody />}>
      <SearchFieldLoaded searchParams={props.searchParams} />
    </Suspense>
  );
}
