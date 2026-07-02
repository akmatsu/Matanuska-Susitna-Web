'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { DataTable, DataTableRow } from '@/components/Tables/';
import type {
  ApiResponseBody,
  ParcelSearchResult,
  SortDirection,
  SortField,
  SortParams,
  SubdivisionSearchResult,
} from './types';
import { cn } from '@matsugov/ui/lib';

function sortHref(
  field: SortField,
  sort: SortParams,
  query: string,
  mode: string,
): string {
  const isActive = sort.sortField === field;
  const direction: SortDirection =
    isActive && sort.sortDirection === 'ASC' ? 'DESC' : 'ASC';
  const secondary: SortField = field === 'ADDRESS' ? 'OWNER' : 'ADDRESS';

  const params = new URLSearchParams({
    query,
    mode,
    sortField: field,
    sortDirection: direction,
    sortField2: secondary,
    sortDirection2: 'ASC',
  });

  return `/search?${params.toString()}`;
}

function SortableHeaderLabel({
  label,
  field,
  sort,
  query,
  mode,
}: {
  label: string;
  field: SortField;
  sort: SortParams;
  query: string;
  mode: string;
}) {
  const isActive = sort.sortField === field;

  return (
    <Link
      href={sortHref(field, sort, query, mode)}
      className="flex items-center gap-1 font-semibold whitespace-nowrap text-white hover:underline"
      aria-label={`Sort by ${label}${
        isActive
          ? sort.sortDirection === 'ASC'
            ? ', currently sorted ascending'
            : ', currently sorted descending'
          : ''
      }`}
    >
      {label}
      <span
        aria-hidden="true"
        className={cn(
          'size-6',
          isActive ? 'opacity-100' : 'opacity-30',
          sort.sortDirection === 'DESC'
            ? 'icon-[mdi--caret-down]'
            : 'icon-[mdi--caret-up]',
        )}
      ></span>
    </Link>
  );
}

type ResultsInfiniteProps = {
  initialData: ApiResponseBody;
  query: string;
  mode: string;
  sort: SortParams;
};

export function ResultsInfinite({
  initialData,
  query,
  mode,
  sort,
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
        sortField: sort.sortField,
        sortDirection: sort.sortDirection,
        sortField2: sort.sortField2,
        sortDirection2: sort.sortDirection2,
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
  }, [
    hasMore,
    isLoading,
    mode,
    page,
    pageSize,
    query,
    sort,
    AUTOLOAD_DEBOUNCE_MS,
  ]);

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
      <div className="mt-4 flex flex-col items-center gap-2 text-center text-gray-600">
        <p>No results found for query &quot;{query}&quot;.</p>
        <div className="max-w-2xl space-y-2">
          {['owner', 'wild'].includes(mode) && (
            <div className="rounded border-l-4 border-blue-500 bg-blue-100 p-2 text-left">
              <p>
                For best results when searching by owner name, enter the{' '}
                <span className="font-bold">last name only</span>. E.g.: to
                search for &quot;Bill Jones&quot;, just enter &quot;Jones&quot;.
              </p>
            </div>
          )}
          {['address', 'wild'].includes(mode) && (
            <div className="rounded border-l-4 border-blue-500 bg-blue-100 p-2 text-left">
              <p>
                When searching by address,{' '}
                <span className="font-bold">only use abbreviations </span> for
                directional indicators{' '}
                <span className="font-bold">(N, S, E, W) </span> and street
                types <span className="font-bold">(St, Ave, Rd, etc)</span>. Do
                not include punctuation such as commas or periods.
              </p>
            </div>
          )}
        </div>
      </div>
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
                            {result.BASEMAP_ABBR && (
                              <Link
                                href={`https://matsugov.us/taxmaps/dxf/${result.BASEMAP_ABBR.toUpperCase()}00.dxf`}
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
                  {result.BASEMAP_ABBR && (
                    <Link
                      href={`https://matsugov.us/taxmaps/dxf/${result.BASEMAP_ABBR.toUpperCase()}00.dxf`}
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
              {
                label: (
                  <SortableHeaderLabel
                    label="Account ID"
                    field="TAX_ID"
                    sort={sort}
                    query={query}
                    mode={mode}
                  />
                ),
              },
              {
                label: (
                  <SortableHeaderLabel
                    label="Parcel ID"
                    field="PARCEL_ID"
                    sort={sort}
                    query={query}
                    mode={mode}
                  />
                ),
              },
              {
                label: (
                  <SortableHeaderLabel
                    label="Owner"
                    field="OWNER"
                    sort={sort}
                    query={query}
                    mode={mode}
                  />
                ),
              },
              {
                label: (
                  <SortableHeaderLabel
                    label="Address"
                    field="ADDRESS"
                    sort={sort}
                    query={query}
                    mode={mode}
                  />
                ),
              },
              {
                label: (
                  <SortableHeaderLabel
                    label="Subdivision"
                    field="SUBD_NAME"
                    sort={sort}
                    query={query}
                    mode={mode}
                  />
                ),
              },
              { label: 'Maps' },
            ]}
          >
            {parcelRows.map((result) => (
              <DataTableRow
                key={`${result.PARCEL_ID.trim()}-${result.ADDRESS?.trim()}`}
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
                        {result.ADDRESS}
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
                            {result.BASEMAP_ABBR && (
                              <Link
                                href={`https://matsugov.us/taxmaps/dxf/${result.BASEMAP_ABBR.toUpperCase()}00.dxf`}
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
                key={`${result.PARCEL_ID.trim()}-${result.ADDRESS?.trim()}`}
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
                  <strong>Address:</strong> {result.ADDRESS}
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
                  {result.BASEMAP_ABBR && (
                    <Link
                      href={`https://matsugov.us/taxmaps/dxf/${result.BASEMAP_ABBR.toUpperCase()}00.dxf`}
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
            className="msb-btn-error mt-2"
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
