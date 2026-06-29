'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { DataTable, DataTableRow } from '@/components/Tables/';
import type {
  ApiResponseBody,
  ParcelSearchResult,
  SubdivisionSearchResult,
} from './types';

type ResultsInfiniteProps = {
  initialData: ApiResponseBody;
  query: string;
  mode: string;
};

export function ResultsInfinite({
  initialData,
  query,
  mode,
}: ResultsInfiniteProps) {
  const AUTOLOAD_DEBOUNCE_MS = 350;

  const [rows, setRows] = useState(initialData.data);
  const [page, setPage] = useState(initialData.metaData.page || 1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const loadingRef = useRef(false);
  const nextAllowedLoadAtRef = useRef(0);

  const pageSize = initialData.metaData.pageSize || 0;

  const [hasMore, setHasMore] = useState(
    pageSize > 0 && initialData.data.length >= pageSize,
  );

  const modeIsSubdivision = mode === 'sub';

  const fetchNextPage = useCallback(async () => {
    if (loadingRef.current || isLoading || !hasMore) {
      return;
    }

    const now = Date.now();
    if (now < nextAllowedLoadAtRef.current) {
      return;
    }

    nextAllowedLoadAtRef.current = now + AUTOLOAD_DEBOUNCE_MS;
    loadingRef.current = true;

    setIsLoading(true);
    setError(null);

    try {
      const nextPage = page + 1;
      const params = new URLSearchParams({
        query,
        mode,
        page: String(nextPage),
      });

      const response = await fetch(`/api/search?${params.toString()}`);
      if (!response.ok) {
        throw new Error(`Failed to load more results (${response.status})`);
      }

      const data: ApiResponseBody = await response.json();
      const incoming = data.data ?? [];
      const incomingPageSize = data.metaData.pageSize || pageSize;

      setRows((current) => [...current, ...incoming]);
      setPage(data.metaData.page || nextPage);

      // Without total-count metadata, stop once a page is not full.
      setHasMore(incomingPageSize > 0 && incoming.length >= incomingPageSize);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load more');
    } finally {
      loadingRef.current = false;
      setIsLoading(false);
    }
  }, [hasMore, isLoading, mode, page, pageSize, query, AUTOLOAD_DEBOUNCE_MS]);

  useEffect(() => {
    const node = sentinelRef.current;

    if (!node || !hasMore) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            void fetchNextPage();
          }
        }
      },
      {
        rootMargin: '450px 0px',
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [fetchNextPage, hasMore]);

  const parcelRows = useMemo(() => rows as ParcelSearchResult[], [rows]);
  const subdivisionRows = useMemo(
    () => rows as SubdivisionSearchResult[],
    [rows],
  );

  if (!rows.length) {
    return (
      <p className="mt-4 text-center text-gray-600">
        No results found for query &quot;{query}&quot;.
      </p>
    );
  }

  return (
    <>
      {modeIsSubdivision ? (
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
            {subdivisionRows.map((result) => (
              <DataTableRow
                key={result.SUBD_NUM}
                cells={[
                  {
                    value: (
                      <Link
                        href={`/search?mode=subid&query=${result.SUBD_NUM}`}
                      >
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
                                <span className="sr-only">
                                  Download DXF Map
                                </span>
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

          <ul className="space-y-2 sm:hidden">
            {subdivisionRows.map((result) => (
              <li
                key={result.SUBD_NUM}
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
      ) : (
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
            {parcelRows.map((result) => (
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
                  { value: result.TAX_ID },
                  { value: result.PARCEL_ID },
                  { value: result.OWNER },
                  {
                    value: (
                      <span>
                        {result.Address}
                        {result.SITE_MULT === 'Y' && (
                          <span className="m-1 ml-1 inline-block rounded border border-blue-400 bg-blue-100 px-1.5 py-0.5 text-xs font-medium text-blue-900">
                            Multiple addresses
                          </span>
                        )}
                      </span>
                    ),
                  },
                  { value: result.SUBD_NAME },
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
                            {result.basemap_abbr && (
                              <Link
                                href={`https://matsugov.us/taxmaps/dxf/${result.basemap_abbr.toUpperCase()}00.dxf`}
                                className="bg-primary flex size-8 items-center justify-center rounded-full p-1.5 text-white"
                                title="Download DXF Map"
                              >
                                <span className="sr-only">
                                  Download DXF Map
                                </span>
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

          <ul className="space-y-2 sm:hidden">
            {parcelRows.map((result) => (
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
      )}

      <div ref={sentinelRef} className="h-2 w-full" aria-hidden="true" />

      {isLoading && (
        <p className="before:icon-[mdi--loading] text-center text-sm text-gray-500 before:mt-4 before:mr-2 before:animate-spin">
          <span className=""></span>Loading more results...
        </p>
      )}

      {error && (
        <div className="mt-4 text-center">
          <p className="text-sm text-red-700">{error}</p>
          <button
            type="button"
            className="mt-2 rounded border border-red-700 px-3 py-1 text-sm text-red-700"
            onClick={() => {
              void fetchNextPage();
            }}
          >
            Try again
          </button>
        </div>
      )}

      {!hasMore && !isLoading && rows.length > 0 && (
        <p className="mt-4 text-center text-sm text-gray-500">End of results</p>
      )}
    </>
  );
}
