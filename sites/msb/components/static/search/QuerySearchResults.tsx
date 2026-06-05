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

function buildPageHref(query: string, page: number) {
  const params = new URLSearchParams({
    query,
    page: String(page),
  });

  return `/search?${params.toString()}`;
}

export async function QuerySearchResults({
  query,
  page,
}: {
  query: string;
  page: number;
}) {
  const results = await searchPages({ query, page });

  if (!results.hits.length) {
    return (
      <p className="text-msb-base-dark mt-4">
        No results found for &quot;{query}&quot;.
      </p>
    );
  }

  return (
    <div className="mt-6">
      <p className="text-msb-base-dark mb-4 text-sm">
        Showing {results.hits.length} of {results.found} results for &quot;
        {query}&quot;.
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
                  href={buildPageHref(query, results.page - 1)}
                  className="text-primary font-semibold underline"
                >
                  Previous
                </Link>
              ) : (
                <span className="text-msb-base-light">Previous</span>
              )}
            </li>
            <li className="text-sm">
              Page {results.page} of {results.totalPages}
            </li>
            <li>
              {results.page < results.totalPages ? (
                <Link
                  href={buildPageHref(query, results.page + 1)}
                  className="text-primary font-semibold underline"
                >
                  Next
                </Link>
              ) : (
                <span className="text-msb-base-light">Next</span>
              )}
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
