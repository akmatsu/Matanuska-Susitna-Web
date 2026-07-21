import { propertyApiCall } from '@msb/property-sdk';
import { ResultsInfinite } from './ResultsInfinite';
import { ApiResponseBody, SortParams, toSingleParam } from './types';
import { redirect } from 'next/navigation';

export async function Results({
  searchParams,
  sort,
}: {
  searchParams: Record<string, string | string[] | undefined>;
  sort: SortParams;
}) {
  const normalizedQuery = toSingleParam(searchParams.query);
  const normalizedMode = toSingleParam(searchParams.mode);

  if (!normalizedQuery) {
    const queryParams = new URLSearchParams(
      searchParams as Record<string, string>,
    );
    return redirect(`/?${queryParams.toString()}`);
  }

  const data = await propertyApiCall<ApiResponseBody>('/search', {
    query: normalizedQuery,
    mode: normalizedMode,
    ...(normalizedMode !== 'sub' && {
      page: '1',
      sortField: sort.sortField,
      sortDirection: sort.sortDirection,
      sortField2: sort.sortField2,
      sortDirection2: sort.sortDirection2,
    }),
  });

  return (
    <ResultsInfinite
      initialData={data}
      query={normalizedQuery}
      mode={normalizedMode}
      sort={sort}
    />
  );
}
