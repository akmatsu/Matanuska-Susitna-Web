import { cmsGet, nullOn404, type CmsQuery } from './core/client';
import { cacheConfig, cmsTags, type CacheOptions } from './core/cache';
import type { DraftPreviewLink } from './core/drafts';
import type { WithIncludes } from './core/includes';
import { fetchAllPages, MAX_PER_PAGE, type Paginated } from './core/pagination';
import type { ContentDocumentCollections, ContentReferences } from './tiptap';
import type { OrgUnit, OrgUnitType } from './types';

const RESOURCE = 'org-units';

/** Relations that can be requested with `include`. */
export type OrgUnitInclude = NonNullable<
  CmsQuery<'/org-units/{slug}'>['include']
>[number];

export type OrgUnitSort = NonNullable<CmsQuery<'/org-units'>['sort']>;

export type OrgUnitWith<I extends OrgUnitInclude> = WithIncludes<OrgUnit, I>;

export type OrgUnitDetail<I extends OrgUnitInclude> = {
  data: OrgUnitWith<I>;
  /** Records that `dynamicLink` marks in `data.content` point to. */
  references: ContentReferences;
  /** Document collections embedded in `data.content`. */
  documentCollections: ContentDocumentCollections;
};

/**
 * Gets one published org unit by slug, with the requested relations.
 * Returns `null` when the org unit doesn't exist or isn't published.
 *
 * Org units with `showPage: false` are still returned. The site decides
 * whether they get a page.
 */
export async function getOrgUnit<
  const I extends readonly OrgUnitInclude[] = [],
>(
  slug: string,
  options: { include?: I } & CacheOptions = {},
): Promise<OrgUnitDetail<I[number]> | null> {
  const res = await nullOn404(
    cmsGet('/org-units/{slug}', {
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
  return res as unknown as OrgUnitDetail<I[number]> | null;
}

/**
 * Gets an org unit draft through a signed preview link from the CMS's
 * Preview button. The response has the same shape as `getOrgUnit()`.
 *
 * - Returns `null` when the draft no longer exists (usually because it was
 *   published).
 * - Throws a `CmsApiError` with status 403 when the link is invalid or
 *   expired.
 * - Never cached, so every preview shows the latest saved draft.
 */
export async function getOrgUnitDraft<
  const I extends readonly OrgUnitInclude[] = [],
>(
  link: DraftPreviewLink,
  options: { include?: I } = {},
): Promise<OrgUnitDetail<I[number]> | null> {
  const res = await nullOn404(
    cmsGet('/org-unit-drafts/{id}', {
      path: { id: link.id },
      query: {
        expires: link.expires,
        signature: link.signature,
        include: options.include ? [...options.include] : undefined,
      },
      cache: 'no-store',
    }),
  );
  return res as unknown as OrgUnitDetail<I[number]> | null;
}

export type ListOrgUnitsOptions<I extends readonly OrgUnitInclude[]> = {
  include?: I;
  page?: number;
  perPage?: number;
  sort?: OrgUnitSort;
  filter?: {
    slug?: string[];
    /** Tag ids. Matches org units with any of them. */
    tags?: string[];
    /** Matches org units of any of these types. */
    unitType?: OrgUnitType[];
    /** `true` keeps only org units that have their own page. */
    showPage?: boolean;
  };
} & CacheOptions;

/** Gets one page of published org units. */
export async function listOrgUnits<
  const I extends readonly OrgUnitInclude[] = [],
>(
  options: ListOrgUnitsOptions<I> = {},
): Promise<Paginated<OrgUnitWith<I[number]>>> {
  const { filter } = options;
  const res = await cmsGet('/org-units', {
    query: {
      include: options.include ? [...options.include] : undefined,
      page: options.page,
      per_page: options.perPage,
      sort: options.sort,
      'filter[slug]': filter?.slug?.join(','),
      'filter[tags]': filter?.tags?.join(','),
      'filter[unitType]': filter?.unitType?.join(','),
      'filter[showPage]': filter?.showPage,
    },
    next: cacheConfig([cmsTags.list(RESOURCE)], options),
  });
  return res as unknown as Paginated<OrgUnitWith<I[number]>>;
}

/** Gets every published org unit, walking all pages. */
export async function listAllOrgUnits<
  const I extends readonly OrgUnitInclude[] = [],
>(
  options: Omit<ListOrgUnitsOptions<I>, 'page' | 'perPage'> = {},
): Promise<OrgUnitWith<I[number]>[]> {
  return fetchAllPages((page) =>
    listOrgUnits({ ...options, page, perPage: MAX_PER_PAGE }),
  );
}
