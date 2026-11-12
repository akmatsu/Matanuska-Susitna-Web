import { cmsGet, nullOn404, type CmsQuery } from './core/client';
import { cacheConfig, cmsTags, type CacheOptions } from './core/cache';
import type { DraftPreviewLink } from './core/drafts';
import type { WithIncludes } from './core/includes';
import { fetchAllPages, MAX_PER_PAGE, type Paginated } from './core/pagination';
import type { ContentDocumentCollections, ContentReferences } from './tiptap';
import type { Topic } from './types';

const RESOURCE = 'topics';

/** Relations that can be requested with `include`. */
export type TopicInclude = NonNullable<
  CmsQuery<'/topics/{slug}'>['include']
>[number];

export type TopicSort = NonNullable<CmsQuery<'/topics'>['sort']>;

export type TopicWith<I extends TopicInclude> = WithIncludes<Topic, I>;

export type TopicDetail<I extends TopicInclude> = {
  data: TopicWith<I>;
  /** Records that `dynamicLink` marks in `data.content` point to. */
  references: ContentReferences;
  /** Document collections embedded in `data.content`. */
  documentCollections: ContentDocumentCollections;
};

/**
 * Gets one published topic by slug, with the requested relations.
 * Returns `null` when the topic doesn't exist or isn't published.
 */
export async function getTopic<const I extends readonly TopicInclude[] = []>(
  slug: string,
  options: { include?: I } & CacheOptions = {},
): Promise<TopicDetail<I[number]> | null> {
  const res = await nullOn404(
    cmsGet('/topics/{slug}', {
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
  return res as unknown as TopicDetail<I[number]> | null;
}

/**
 * Gets a topic draft through a signed preview link from the CMS's Preview
 * button. The response has the same shape as `getTopic()`.
 *
 * - Returns `null` when the draft no longer exists (usually because it was
 *   published).
 * - Throws a `CmsApiError` with status 403 when the link is invalid or
 *   expired.
 * - Never cached, so every preview shows the latest saved draft.
 */
export async function getTopicDraft<
  const I extends readonly TopicInclude[] = [],
>(
  link: DraftPreviewLink,
  options: { include?: I } = {},
): Promise<TopicDetail<I[number]> | null> {
  const res = await nullOn404(
    cmsGet('/topic-drafts/{id}', {
      path: { id: link.id },
      query: {
        expires: link.expires,
        signature: link.signature,
        include: options.include ? [...options.include] : undefined,
      },
      cache: 'no-store',
    }),
  );
  return res as unknown as TopicDetail<I[number]> | null;
}

export type ListTopicsOptions<I extends readonly TopicInclude[]> = {
  include?: I;
  page?: number;
  perPage?: number;
  sort?: TopicSort;
  filter?: {
    slug?: string[];
    /** Tag ids. Matches topics with any of them. */
    tags?: string[];
  };
} & CacheOptions;

/** Gets one page of published topics. */
export async function listTopics<const I extends readonly TopicInclude[] = []>(
  options: ListTopicsOptions<I> = {},
): Promise<Paginated<TopicWith<I[number]>>> {
  const { filter } = options;
  const res = await cmsGet('/topics', {
    query: {
      include: options.include ? [...options.include] : undefined,
      page: options.page,
      per_page: options.perPage,
      sort: options.sort,
      'filter[slug]': filter?.slug?.join(','),
      'filter[tags]': filter?.tags?.join(','),
    },
    next: cacheConfig([cmsTags.list(RESOURCE)], options),
  });
  return res as unknown as Paginated<TopicWith<I[number]>>;
}

/** Gets every published topic, walking all pages. */
export async function listAllTopics<
  const I extends readonly TopicInclude[] = [],
>(
  options: Omit<ListTopicsOptions<I>, 'page' | 'perPage'> = {},
): Promise<TopicWith<I[number]>[]> {
  return fetchAllPages((page) =>
    listTopics({ ...options, page, perPage: MAX_PER_PAGE }),
  );
}
