import { cmsGet, nullOn404, type CmsQuery } from './core/client';
import { cacheConfig, cmsTags, type CacheOptions } from './core/cache';
import type { DraftPreviewLink } from './core/drafts';
import type { WithIncludes } from './core/includes';
import { fetchAllPages, MAX_PER_PAGE, type Paginated } from './core/pagination';
import type { ContentDocumentCollections, ContentReferences } from './tiptap';
import type { Service } from './types';

const RESOURCE = 'services';

/** Relations that can be requested with `include`. */
export type ServiceInclude = NonNullable<
  CmsQuery<'/services/{slug}'>['include']
>[number];

export type ServiceSort = NonNullable<CmsQuery<'/services'>['sort']>;

export type ServiceWith<I extends ServiceInclude> = WithIncludes<Service, I>;

export type ServiceDetail<I extends ServiceInclude> = {
  data: ServiceWith<I>;
  /** Records that `dynamicLink` marks in `data.content` point to. */
  references: ContentReferences;
  /** Document collections embedded in `data.content`. */
  documentCollections: ContentDocumentCollections;
};

/**
 * Gets one published service by slug, with the requested relations.
 * Returns `null` when the service doesn't exist or isn't published.
 */
export async function getService<
  const I extends readonly ServiceInclude[] = [],
>(
  slug: string,
  options: { include?: I } & CacheOptions = {},
): Promise<ServiceDetail<I[number]> | null> {
  const res = await nullOn404(
    cmsGet('/services/{slug}', {
      path: { slug },
      query: { include: options.include ? [...options.include] : undefined },
      next: cacheConfig(
        [cmsTags.list(RESOURCE), cmsTags.item(RESOURCE, slug)],
        options,
      ),
    }),
  );
  // The cast narrows the spec's generic `content` node to our TipTap
  // union, and marks the requested relations as present.
  return res as unknown as ServiceDetail<I[number]> | null;
}

/**
 * Gets a service draft through a signed preview link from the CMS's Preview
 * button. The response has the same shape as `getService()`.
 *
 * - Returns `null` when the draft no longer exists (usually because it was
 *   published).
 * - Throws a `CmsApiError` with status 403 when the link is invalid or
 *   expired.
 * - Never cached, so every preview shows the latest saved draft.
 */
export async function getServiceDraft<
  const I extends readonly ServiceInclude[] = [],
>(
  link: DraftPreviewLink,
  options: { include?: I } = {},
): Promise<ServiceDetail<I[number]> | null> {
  const res = await nullOn404(
    cmsGet('/service-drafts/{id}', {
      path: { id: link.id },
      query: {
        expires: link.expires,
        signature: link.signature,
        include: options.include ? [...options.include] : undefined,
      },
      cache: 'no-store',
    }),
  );
  return res as unknown as ServiceDetail<I[number]> | null;
}

export type ListServicesOptions<I extends readonly ServiceInclude[]> = {
  include?: I;
  page?: number;
  perPage?: number;
  sort?: ServiceSort;
  filter?: {
    slug?: string[];
    /** Tag ids. Matches services with any of them. */
    tags?: string[];
    /** Topic slugs. Matches services in any of them. */
    topics?: string[];
  };
} & CacheOptions;

/** Gets one page of published services. */
export async function listServices<
  const I extends readonly ServiceInclude[] = [],
>(
  options: ListServicesOptions<I> = {},
): Promise<Paginated<ServiceWith<I[number]>>> {
  const { filter } = options;
  const res = await cmsGet('/services', {
    query: {
      include: options.include ? [...options.include] : undefined,
      page: options.page,
      per_page: options.perPage,
      sort: options.sort,
      'filter[slug]': filter?.slug?.join(','),
      'filter[tags]': filter?.tags?.join(','),
      'filter[topics]': filter?.topics?.join(','),
    },
    next: cacheConfig([cmsTags.list(RESOURCE)], options),
  });
  return res as unknown as Paginated<ServiceWith<I[number]>>;
}

/** Gets every published service, walking all pages. */
export async function listAllServices<
  const I extends readonly ServiceInclude[] = [],
>(
  options: Omit<ListServicesOptions<I>, 'page' | 'perPage'> = {},
): Promise<ServiceWith<I[number]>[]> {
  return fetchAllPages((page) =>
    listServices({ ...options, page, perPage: MAX_PER_PAGE }),
  );
}
