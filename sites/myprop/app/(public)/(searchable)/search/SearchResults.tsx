import { getSearchParams } from '@/utils/serverHelpers';
import { cacheLife, cacheTag } from 'next/cache';
import Link from 'next/link';

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

  async function getData() {
    'use cache';
    cacheTag('parcels', type, query);
    cacheLife('days');

    const url = new URL('http://localhost:3002/api/v1/parcels');
    url.searchParams.set('type', type);
    url.searchParams.set('query', query);

    const res = await fetch(url.toString());
    if (!res.ok) throw new Error('Parcel search failed: ' + res.status);

    return res.json();
  }

  const data: ApiResponseBody = await getData();

  if (!data.results.length) {
    return <p className="mt-4 text-center text-gray-600">No results found.</p>;
  }

  return (
    <ul>
      {data.results.map((result) => (
        <li key={result.PARCEL_ID}>
          <strong>{result.OWNER}</strong> - {result.CITE_ADDRESS} (Status:{' '}
          {result.STATUS}, Balance: ${result.BALANCE})
          <Link href={`/parcels/${result.PARCEL_ID}`}>View</Link>
        </li>
      ))}
    </ul>
  );
}
