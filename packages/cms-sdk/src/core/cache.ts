import type { CmsCacheConfig } from './client';

/** Seconds before cached CMS data is refetched, unless a caller overrides it. */
export const DEFAULT_REVALIDATE = 60;

/**
 * Cache tags for CMS data. Every request is tagged now, so that a future
 * CMS publish webhook can call `revalidateTag()` with these values without
 * changing the pages.
 */
export const cmsTags = {
  all: 'cms',
  /** Every record of one resource, e.g. `cms:services`. */
  list: (resource: string) => `cms:${resource}`,
  /** One record, e.g. `cms:services:animal-care`. */
  item: (resource: string, key: string) => `cms:${resource}:${key}`,
};

export type CacheOptions = {
  /** Seconds to cache the response. `false` caches it until revalidated by tag. */
  revalidate?: number | false;
};

export function cacheConfig(
  tags: string[],
  options?: CacheOptions,
): CmsCacheConfig {
  return {
    revalidate: options?.revalidate ?? DEFAULT_REVALIDATE,
    tags: [cmsTags.all, ...tags],
  };
}
