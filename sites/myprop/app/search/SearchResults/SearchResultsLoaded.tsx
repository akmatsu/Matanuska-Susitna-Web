import { getSearchParams } from '@/utils/serverHelpers';
import Link from 'next/link';
import { DataTable, DataTableRow } from '@/components/Tables/';
import { propertyApiCall } from '@/utils/apiHelpers';

type ParcelSearchResult = {
  TAX_ID: string;
  OWNER: string | null;
  BUYER: string | null;
  SUBD_NAME: string | null;
  SITE_MULT: 'Y' | 'N';
  Address: string | null;
  PARCEL_ID: string;
  MAP: string | null;
  basemap_abbr: string | null;
};

type SubdivisionSearchResult = {
  SUBD_NAME: string;
  SUBD_NUM: string;
  MAP: string;
  basemap_abbr: string | null;
};

type ApiResponseBody = {
  metaData: {
    page: number;
    pageSize: number;
    MaxRecords?: number;
  };
  data: Array<ParcelSearchResult | SubdivisionSearchResult>;
};

export async function SearchResultsLoaded() {
  const { query, mode } = await getSearchParams<{
    query: string;
    mode: string;
  }>();

  const data = await propertyApiCall<ApiResponseBody>('/search', {
    query,
    mode,
  });

  if (!data.data.length) {
    return (
      <p className="mt-4 text-center text-gray-600">
        No results found for query &quot;{query}&quot;.
      </p>
    );
  }

  if (mode === 'sub') {
    return (
      <DataTable
        headers={[
          { label: 'Details' },
          { label: 'Subdivision Name' },
          { label: 'Subdivision Number' },
          { label: 'Maps' },
        ]}
      >
        {data.data.map((result: SubdivisionSearchResult) => (
          <DataTableRow
            key={`${result.SUBD_NUM}`}
            cells={[
              {
                value: (
                  <Link href={`/search?mode=subid&query=${result.SUBD_NUM}`}>
                    View
                  </Link>
                ),
              },
              { value: result.SUBD_NAME },
              { value: result.SUBD_NUM },
              {
                value: (
                  <>
                    {result.MAP && (
                      <div className="flex items-center gap-2 p-1">
                        <Link
                          href={`https://matsugov.us/taxmaps/pdf/${result.MAP.toUpperCase()}.pdf`}
                          className="bg-primary flex size-8 items-center justify-center rounded-full p-1.5 text-white"
                        >
                          <span className="sr-only">View PDF Map</span>
                          <span
                            aria-hidden="true"
                            className="icon-[gravity-ui--logo-acrobat] size-full"
                          ></span>
                        </Link>
                        {result.basemap_abbr && (
                          <Link
                            href={`https://matsugov.us/taxmaps/dxf/${result.basemap_abbr.toUpperCase()}00.dxf`}
                            className="bg-primary flex size-8 items-center justify-center rounded-full p-1.5 text-white"
                          >
                            <span className="sr-only">View DXF Map</span>
                            <span
                              aria-hidden="true"
                              className="icon-[mdi--download] size-full"
                            ></span>
                          </Link>
                        )}
                      </div>
                    )}
                  </>
                ),
              },
            ]}
          />
        ))}
      </DataTable>
    );
  }

  return (
    <DataTable
      headers={[
        { label: 'Details' },
        { label: 'Account ID' },
        { label: 'Parcel ID' },
        { label: 'Owner' },
        { label: 'Address' },
        { label: 'Subdivision' },
        { label: 'Address' },
        { label: 'Maps' },
      ]}
    >
      {data.data.map((result: ParcelSearchResult) => (
        <DataTableRow
          key={`${result.PARCEL_ID.trim()}-${result.Address?.trim()}`}
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
            {
              value: (
                <>
                  {result.MAP && (
                    <div className="flex items-center gap-2 p-1">
                      <Link
                        href={`https://matsugov.us/taxmaps/pdf/${result.MAP.toUpperCase()}.pdf`}
                        className="bg-primary flex size-8 items-center justify-center rounded-full p-1.5 text-white"
                      >
                        <span className="sr-only">View PDF Map</span>
                        <span
                          aria-hidden="true"
                          className="icon-[gravity-ui--logo-acrobat] size-full"
                        ></span>
                      </Link>
                      <Link
                        href={`https://matsugov.us/taxmaps/dxf/${result.basemap_abbr?.toUpperCase()}00.dxf`}
                        className="bg-primary flex size-8 items-center justify-center rounded-full p-1.5 text-white"
                      >
                        <span className="sr-only">View DXF Map</span>
                        <span
                          aria-hidden="true"
                          className="icon-[mdi--download] size-full"
                        ></span>
                      </Link>
                    </div>
                  )}
                </>
              ),
            },
          ]}
        />
      ))}
    </DataTable>
  );
}
