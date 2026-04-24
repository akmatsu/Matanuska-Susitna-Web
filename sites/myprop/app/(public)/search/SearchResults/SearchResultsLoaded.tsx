import { getSearchParams } from '@/utils/serverHelpers';
import Link from 'next/link';
import { DataTable, DataTableRow } from '@/components/Tables/';
import { propertyApiCall } from '@/utils/apiHelpers';

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

export async function SearchResultsLoaded() {
  const { query } = await getSearchParams<{
    query: string;
  }>();

  const data = await propertyApiCall<ApiResponseBody>(
    `/search?query=${encodeURIComponent(query)}`,
  );

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
