import { propertyApiCall } from '@msb/property-sdk';
import { ResultsInfinite } from './ResultsInfinite';
import { ApiResponseBody, toSingleParam } from './types';

export async function Results({
  searchParams: { query, mode },
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const normalizedQuery = toSingleParam(query);
  const normalizedMode = toSingleParam(mode);

  const data = await propertyApiCall<ApiResponseBody>('/search', {
    query: normalizedQuery,
    mode: normalizedMode,
    page: '1',
  });

  return (
    <ResultsInfinite
      initialData={data}
      query={normalizedQuery}
      mode={normalizedMode}
    />
  );
}
