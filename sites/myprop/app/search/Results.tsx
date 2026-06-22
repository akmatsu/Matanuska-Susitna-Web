import Link from 'next/link';
import { DataTable, DataTableRow } from '@/components/Tables/';
import { propertyApiCall } from '@msb/property-sdk';

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

export async function Results({
  searchParams: { query, mode },
}: {
  searchParams: Record<string, string | string[]>;
}) {
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
      <>
        <DataTable
          className="hidden sm:block"
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
                            title="View PDF Map"
                            aria-label="View PDF Map"
                          >
                            <span className="sr-only">View PDF Map</span>
                            <span
                              aria-hidden="true"
                              className="icon-msb--download-pdf size-full"
                            ></span>
                          </Link>
                          {result.basemap_abbr && (
                            <Link
                              href={`https://matsugov.us/taxmaps/dxf/${result.basemap_abbr.toUpperCase()}00.dxf`}
                              className="bg-primary flex size-8 items-center justify-center rounded-full p-1.5 text-white"
                              title="Download DXF Map"
                              aria-label="Download DXF Map"
                            >
                              <span className="sr-only">Download DXF Map</span>
                              <span
                                aria-hidden="true"
                                className="icon-msb--download-dxf size-full"
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
        {/* Mobile view */}
        <ul className="space-y-2 sm:hidden">
          {data.data.map((result: SubdivisionSearchResult) => (
            <li
              key={`${result.SUBD_NUM}`}
              className="border-table-border bg-surface border-b p-4"
            >
              <p>
                <strong>Subdivision Name:</strong> {result.SUBD_NAME}
              </p>
              <p>
                <strong>Subdivision Number:</strong> {result.SUBD_NUM}
              </p>
              <div className="mt-2 flex items-center gap-4">
                <Link
                  href={`/search?mode=subid&query=${result.SUBD_NUM}`}
                  className="text-primary"
                >
                  View Details
                </Link>
                {result.MAP && (
                  <Link
                    href={`https://matsugov.us/taxmaps/pdf/${result.MAP.toUpperCase()}.pdf`}
                    className="bg-primary flex size-8 items-center justify-center rounded-full p-1.5 text-white"
                    title="View PDF Map"
                  >
                    <span className="sr-only">View PDF Map</span>
                    <span
                      aria-hidden="true"
                      className="icon-msb--download-pdf size-full"
                    ></span>
                  </Link>
                )}
                {result.basemap_abbr && (
                  <Link
                    href={`https://matsugov.us/taxmaps/dxf/${result.basemap_abbr.toUpperCase()}00.dxf`}
                    className="bg-primary flex size-8 items-center justify-center rounded-full p-1.5 text-white"
                    title="Download DXF Map"
                  >
                    <span className="sr-only">Download DXF Map</span>
                    <span
                      aria-hidden="true"
                      className="icon-msb--download-dxf size-full"
                    ></span>
                  </Link>
                )}
              </div>
            </li>
          ))}
        </ul>
      </>
    );
  }

  return (
    <>
      <DataTable
        className="hidden sm:block"
        headers={[
          { label: 'Details' },
          { label: 'Account ID' },
          { label: 'Parcel ID' },
          { label: 'Owner' },
          { label: 'Address' },
          { label: 'Subdivision' },
          { label: 'Maps' },
        ]}
      >
        {data.data.map((result: ParcelSearchResult) => (
          <DataTableRow
            key={`${result.PARCEL_ID.trim()}-${result.Address?.trim()}`}
            cells={[
              {
                value: (
                  <Link
                    href={`/parcels/${result.PARCEL_ID.trim()}?returnTo=${encodeURIComponent(`/search?query=${query}&mode=${mode}`)}`}
                  >
                    View
                  </Link>
                ),
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
                value: (
                  <>
                    {result.MAP && (
                      <div className="flex items-center gap-2 p-1">
                        <Link
                          href={`https://matsugov.us/taxmaps/pdf/${result.MAP.toUpperCase()}.pdf`}
                          className="bg-primary flex size-8 items-center justify-center rounded-full p-1.5 text-white"
                          title="View PDF Map"
                        >
                          <span className="sr-only">View PDF Map</span>
                          <span
                            aria-hidden="true"
                            className="icon-msb--download-pdf size-full"
                          ></span>
                        </Link>
                        <Link
                          href={`https://matsugov.us/taxmaps/dxf/${result.basemap_abbr?.toUpperCase()}00.dxf`}
                          className="bg-primary flex size-8 items-center justify-center rounded-full p-1.5 text-white"
                          title="Download DXF Map"
                        >
                          <span className="sr-only">Download DXF Map</span>
                          <span
                            aria-hidden="true"
                            className="icon-msb--download-dxf size-full"
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
      {/* Mobile view */}

      <ul className="space-y-2 sm:hidden">
        {data.data.map((result: ParcelSearchResult) => (
          <li
            key={`${result.PARCEL_ID.trim()}-${result.Address?.trim()}`}
            className="border-table-border bg-surface border-b p-4"
          >
            <p>
              <strong>Account ID:</strong> {result.TAX_ID}
            </p>
            <p>
              <strong>Parcel ID:</strong> {result.PARCEL_ID}
            </p>
            <p>
              <strong>Owner:</strong> {result.OWNER}
            </p>
            <p>
              <strong>Address:</strong> {result.Address}
            </p>
            <p>
              <strong>Subdivision:</strong> {result.SUBD_NAME}
            </p>
            <div className="mt-2 flex items-center gap-4">
              <Link
                href={`/parcels/${result.PARCEL_ID.trim()}?returnTo=${encodeURIComponent(`/search?query=${query}&mode=${mode}`)}`}
                className="text-primary"
              >
                View Details
              </Link>
              {result.MAP && (
                <Link
                  href={`https://matsugov.us/taxmaps/pdf/${result.MAP.toUpperCase()}.pdf`}
                  className="bg-primary flex size-8 items-center justify-center rounded-full p-1.5 text-white"
                  title="View PDF Map"
                >
                  <span className="sr-only">View PDF Map</span>
                  <span
                    aria-hidden="true"
                    className="icon-msb--download-pdf size-full"
                  ></span>
                </Link>
              )}
              {result.basemap_abbr && (
                <Link
                  href={`https://matsugov.us/taxmaps/dxf/${result.basemap_abbr.toUpperCase()}00.dxf`}
                  className="bg-primary flex size-8 items-center justify-center rounded-full p-1.5 text-white"
                  title="Download DXF Map"
                >
                  <span className="sr-only">Download DXF Map</span>
                  <span
                    aria-hidden="true"
                    className="icon-msb--download-dxf size-full"
                  ></span>
                </Link>
              )}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
