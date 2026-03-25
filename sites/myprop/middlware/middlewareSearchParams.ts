import { NextRequest, NextResponse } from 'next/server';

export const HEADER_SEARCH_PARAM = 'x-search-params';

/**
 * NextJS doesn't offer a clean way to access page search params in nested
 * server components without excessive prop drilling. This middleware extracts
 * the search params from the request URL and sets them in a custom header,
 * which can then be accessed by any server component in the route path using the
 * getSearchParamsHeader helper function.
 */
export async function middlewareSearchParams(req: NextRequest) {
  const res = NextResponse.next();

  const url = new URL(req.url);
  const searchParamsObj = Object.fromEntries(url.searchParams.entries());
  const searchParamsStr = JSON.stringify(searchParamsObj);
  if (searchParamsStr) {
    res.headers.set(HEADER_SEARCH_PARAM, searchParamsStr);
  }

  return res;
}
