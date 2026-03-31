import { getSearchParams } from '@/utils/serverHelpers';

interface ApiResponseBody {
  type: string;
  query: string;
  count: number;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  seed: number;
  sourceCount: number;
  results: Array<{
    PARCEL_ID: string;
    TAX_ID: string;
    OWNER: string;
    CITE_ADDRESS: string;
    STATUS: string;
    BALANCE: number;
  }>;
}

export async function SearchResults() {
  const { type, query } = await getSearchParams<{
    type: string;
    query: string;
  }>();

  const data: ApiResponseBody = await fetch(
    'http://localhost:3002/api/v1/parcels?type=' + type + '&query=' + query,
  ).then((res) => res.json());

  console.log(data);

  return (
    <div>
      <h2>Search Type: {type}</h2>
      <h3>Query: {query}</h3>
    </div>
  );
}
