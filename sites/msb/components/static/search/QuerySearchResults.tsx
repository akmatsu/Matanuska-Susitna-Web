import Link from 'next/link';
import pluralize from 'pluralize';
import { SearchListItem } from './SearchListItem';
import { searchPages, type PageSearchDocument } from '@/utils/search/typesense';

function getSearchListKey(type?: string) {
  if (
    type === 'orgUnit' ||
    type === 'org-unit' ||
    type === 'office' ||
    type === 'division' ||
    type === 'department' ||
    type === 'Departments & Divisions' ||
    type === 'OrgUnit'
  ) {
    return 'departments';
  }

  if (
    type === 'community_council' ||
    type === 'ssa_board' ||
    type === 'fsa_board' ||
    type === 'rsa_board'
  ) {
    return 'boards';
  }

  if (type === 'city' || type === 'community') {
    return 'communities';
  }

  if (type === 'legislative' || type === 'strategic') {
    return 'plans';
  }

  if (
    type === 'AKMATSUGOV_PublicNotice' ||
    type === 'MSB_AirQuality' ||
    type === 'AKMATSUGOV_CommunityDevelopment' ||
    type === 'MSB_RoadConstruction'
  ) {
    return 'public-notices';
  }

  return pluralize(type || 'topic');
}

function buildPageHref(query: string, page: number, type?: string) {
  const params = new URLSearchParams({ query, page: String(page) });
  if (type) {
    params.set('type', type);
  }

  return `/search?${params.toString()}`;
}

function getPaginationItems(currentPage: number, totalPages: number) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages = new Set<number>();
  pages.add(1);
  pages.add(totalPages);

  for (let p = currentPage - 1; p <= currentPage + 1; p += 1) {
    if (p > 1 && p < totalPages) {
      pages.add(p);
    }
  }

  if (currentPage <= 3) {
    pages.add(2);
    pages.add(3);
    pages.add(4);
  }

  if (currentPage >= totalPages - 2) {
    pages.add(totalPages - 1);
    pages.add(totalPages - 2);
    pages.add(totalPages - 3);
  }

  const sorted = Array.from(pages)
    .filter((p) => p >= 1 && p <= totalPages)
    .sort((a, b) => a - b);

  const items: Array<number | 'ellipsis'> = [];

  for (let i = 0; i < sorted.length; i += 1) {
    const pageNumber = sorted[i];
    const prev = sorted[i - 1];

    if (i > 0 && pageNumber - prev > 1) {
      items.push('ellipsis');
    }

    items.push(pageNumber);
  }

  return items;
}

export async function QuerySearchResults({
  query,
  page,
  type,
}: {
  query: string;
  page: number;
  type?: string;
}) {
  const results = await searchPages({ query, page, type });

  if (!results.hits.length) {
    return (
      <p className="text-msb-base-dark mt-4">
        No results found{query ? ` for "${query}"` : ''}
        {type ? ` in ${type}` : ''}.
      </p>
    );
  }

  return (
    <div className="mt-6">
      <p className="text-msb-base-dark mb-4 text-sm">
        Showing {results.hits.length} of {results.found} results
        {query ? ` for "${query}"` : ''}
        {type ? ` in ${type}` : ''}.
      </p>

      <ul role="list" className="mb-6 flex flex-col gap-4">
        {results.hits.map((item: PageSearchDocument) => (
          <SearchListItem
            key={item.id}
            item={item as any}
            listKey={getSearchListKey(item.type)}
          />
        ))}
      </ul>

      {results.totalPages > 1 && (
        <nav aria-label="Search results pages" className="mt-4">
          <ul className="flex items-center justify-center gap-3">
            <li>
              {results.page > 1 ? (
                <Link
                  href={buildPageHref(query, results.page - 1, type)}
                  className="text-primary flex items-center justify-center font-semibold underline"
                  title="Previous page"
                >
                  <span
                    className="icon-[mdi--chevron-left] inline-block size-6"
                    aria-hidden="true"
                  ></span>{' '}
                  <span className="sr-only">Previous</span>
                </Link>
              ) : (
                <span className="text-msb-base-light">
                  <span
                    className="icon-[mdi--chevron-left] inline-block size-2"
                    aria-hidden="true"
                  ></span>{' '}
                  <span className="sr-only">Previous</span>
                </span>
              )}
            </li>
            {getPaginationItems(results.page, results.totalPages).map(
              (item, idx) =>
                item === 'ellipsis' ? (
                  <li
                    key={`ellipsis-${idx}`}
                    aria-hidden="true"
                    className="text-msb-base-light"
                  >
                    ...
                  </li>
                ) : item === results.page ? (
                  <li
                    key={item}
                    aria-current="page"
                    className="border-primary text-primary rounded border px-2 py-1 text-sm font-semibold"
                  >
                    {item}
                  </li>
                ) : (
                  <li key={item}>
                    <Link
                      href={buildPageHref(query, item, type)}
                      className="text-primary px-2 py-1 text-sm font-semibold underline"
                    >
                      {item}
                    </Link>
                  </li>
                ),
            )}
            <li>
              {results.page < results.totalPages ? (
                <Link
                  href={buildPageHref(query, results.page + 1, type)}
                  className="text-primary flex items-center justify-center font-semibold underline"
                  title="Next page"
                >
                  <span className="sr-only">Next</span>{' '}
                  <span
                    className="icon-[mdi--chevron-right] inline-block size-6"
                    aria-hidden="true"
                  ></span>
                </Link>
              ) : (
                <span className="text-msb-base-light">
                  <span
                    className="icon-[mdi--chevron-right] inline-block size-2"
                    aria-hidden="true"
                  ></span>{' '}
                  <span className="sr-only">Next</span>
                </span>
              )}
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
