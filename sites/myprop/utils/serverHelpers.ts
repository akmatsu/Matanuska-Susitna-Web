import { headers } from 'next/headers';
import { HEADER_SEARCH_PARAM } from '../middlware/middlewareSearchParams';

/**
 * This is a helper function to easily grab route search params from any server
 * component without prop drilling. It reads the custom header set by the
 * middlewareSearchParams middleware and parses it back into an object.
 *
 * NextJS doesn't currently offer a clean way to access page search params in
 * nested server components without excessive prop drilling. This helper
 * function, used in conjunction with the `middlewareSearchParams` middleware,
 * provides a convenient way to access search params from any server component
 * in the route path.
 */
export async function getSearchParams<
  T = { [key: string]: string | string[] },
>(): Promise<T> {
  const searchParamsHeader = (await headers()).get(HEADER_SEARCH_PARAM);
  return searchParamsHeader ? (JSON.parse(searchParamsHeader) as T) : ({} as T);
}
