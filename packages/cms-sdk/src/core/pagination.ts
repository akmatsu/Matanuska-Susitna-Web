import type { CmsResponse } from './client';

/** Laravel's paginated envelope: `data` plus `links` and `meta`. */
export type Paginated<T> = Omit<CmsResponse<'/services'>, 'data'> & {
  data: T[];
};

/** The CMS rejects a `per_page` above this with a 422. */
export const MAX_PER_PAGE = 100;

/**
 * Fetches page 1 to learn how many pages there are, then fetches the rest
 * in parallel and returns every item in page order.
 */
export async function fetchAllPages<T>(
  fetchPage: (page: number) => Promise<Paginated<T>>,
): Promise<T[]> {
  const first = await fetchPage(1);
  const lastPage = first.meta.last_page;
  if (lastPage <= 1) return first.data;

  const rest = await Promise.all(
    Array.from({ length: lastPage - 1 }, (_, i) => fetchPage(i + 2)),
  );
  return [first, ...rest].flatMap((page) => page.data);
}
