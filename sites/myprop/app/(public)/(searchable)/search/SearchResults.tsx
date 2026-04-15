import { getSearchParams } from '@/utils/serverHelpers';
import { cacheLife, cacheTag } from 'next/cache';
import Link from 'next/link';
import { DataTable, DataTableRow } from '../../parcels/[pid]/components';

type ApiResponseBody = {
  metaData: {
    page: number;
    pageSize: number;
    MaxRecords?: number;
  };
  data: Array<{
    TAX_ID: string;
    OWNER: string | null;
    BUYER: string | null;
    SUBD_NAME: string | null;
    SITE_MULT: 'Y' | 'N';
    Address: string | null;
    PARCEL_ID: string;
    MAP: string | null;
    basemap_abbr: string | null;
  }>;
};

export async function SearchResults() {
  const { type, query } = await getSearchParams<{
    type: string;
    query: string;
  }>();

  async function getData() {
    'use cache';
    cacheTag('parcels', type, query);
    cacheLife('days');

    const url = new URL(`${process.env.API_URL}/property/search`);
    url.searchParams.set('query', query);

    const res = await fetch(url.toString(), {
      headers: {
        ApiKey: process.env.API_KEY || '',
      },
    });

    if (!res.ok) throw new Error('Parcel search failed: ' + res.status);

    return res.json();
  }

  const data: ApiResponseBody = await getData();

  if (!data.data.length) {
    return <p className="mt-4 text-center text-gray-600">No results found.</p>;
  }

  return (
    <ul>
      <DataTable
        headers={[
          { label: 'Details' },
          { label: 'Account ID' },
          { label: 'Parcel ID' },
          { label: 'Owner' },
          { label: 'Address' },
          { label: 'Subdivision' },
          { label: 'Address' },
        ]}
      >
        {data.data.map((result) => (
          <DataTableRow
            key={result.PARCEL_ID}
            cells={[
              {
                value: <Link href={`/parcels/${result.PARCEL_ID}`}>View</Link>,
              },
              {
                value: result.TAX_ID,
              },
              {
                value: result.PARCEL_ID,
              },
              {
                value: result.OWNER,
              },
              {
                value: result.Address,
              },
              {
                value: result.SUBD_NAME,
              },
              {
                value: result.Address,
              },
            ]}
          />
        ))}
      </DataTable>
    </ul>
  );
}
