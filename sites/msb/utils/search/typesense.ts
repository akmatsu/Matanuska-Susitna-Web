import 'server-only';
import Typesense from 'typesense';

export type PageSearchDocument = {
  id: string;
  title: string;
  description?: string;
  slug?: string;
  url?: string;
  type?: string;
};

export type PageSearchResult = {
  hits: PageSearchDocument[];
  found: number;
  page: number;
  perPage: number;
  totalPages: number;
};

export type PageTypeFacet = {
  value: string;
  count: number;
};

export type PopularQuery = {
  id: string;
  q: string;
  count: number;
};

const TYPESENSE_COLLECTION = 'pages';
const POPULAR_QUERIES_COLLECTION = 'popular_queries';
const DEFAULT_PER_PAGE = 12;

const client = new Typesense.Client({
  apiKey: process.env.NEXT_PUBLIC_TYPESENSE_API_KEY || 'xyz',
  nodes: [
    {
      host: process.env.NEXT_PUBLIC_TYPESENSE_HOST || 'localhost',
      port: process.env.NEXT_PUBLIC_TYPESENSE_PORT
        ? parseInt(process.env.NEXT_PUBLIC_TYPESENSE_PORT, 10)
        : 8108,
      protocol: process.env.NEXT_PUBLIC_TYPESENSE_PROTOCOL || 'http',
    },
  ],
  connectionTimeoutSeconds: 5,
});

export async function searchPages({
  query,
  page = 1,
  perPage = DEFAULT_PER_PAGE,
  type,
}: {
  query: string;
  page?: number;
  perPage?: number;
  type?: string;
}): Promise<PageSearchResult> {
  const trimmedQuery = query.trim();
  const trimmedType = type?.trim();

  // Allow query-only or type-only searches, but not completely empty
  if (!trimmedQuery && !trimmedType) {
    return {
      hits: [],
      found: 0,
      page,
      perPage,
      totalPages: 0,
    };
  }

  const result = await client
    .collections(TYPESENSE_COLLECTION)
    .documents()
    .search({
      q: trimmedQuery || '*',
      ...(trimmedQuery && {
        query_by: 'title,embedding,description,body',
        query_by_weights: '4,2,2,1',
        text_match_type: 'max_weight',
        vector_query: 'embedding:([],  distance_threshold:0.6)',
        enable_synonyms: true,
        num_typos: 2,
        min_len_1typo: 4,
        min_len_2typo: 8,
        drop_tokens_threshold: 1,
        prioritize_exact_match: true,
        prioritize_token_position: true,
        // TODO: Experiment with these NLP features in the future to see if they improve relevance
        // nl_model_id: 'cms-nl-search-model',
        // nl_query: true,
      }),
      sort_by: trimmedQuery ? '_text_match:desc,title:asc' : 'title:asc',
      exclude_fields: 'embedding',
      ...(trimmedType
        ? {
            filter_by: `type:=\`${trimmedType.replace(/[`\\]/g, '\\$&')}\``,
          }
        : {}),
      page,
      per_page: perPage,
    });

  const found = result.found || 0;
  const totalPages = Math.max(1, Math.ceil(found / perPage));

  return {
    hits: (result.hits?.map((hit: any) => hit.document) ||
      []) as PageSearchDocument[],
    found,
    page,
    perPage,
    totalPages,
  };
}

export async function instantSearch({
  query,
}: {
  query: string;
}): Promise<PageSearchDocument[]> {
  const trimmedQuery = query.trim();

  // Return empty array for empty queries
  if (!trimmedQuery) {
    return [];
  }

  try {
    const result = await client
      .collections(TYPESENSE_COLLECTION)
      .documents()
      .search({
        q: trimmedQuery,
        query_by: 'title,description,tags,body',
        query_by_weights: '4,2,2,1',
        text_match_type: 'max_weight',
        num_typos: 2,
        min_len_1typo: 4,
        min_len_2typo: 8,
        drop_tokens_threshold: 1,
        prioritize_exact_match: true,
        prioritize_token_position: true,
        sort_by: '_text_match:desc,title:asc',
        exclude_fields: 'embedding',
        per_page: 5,
      });

    return (result.hits?.map((hit: any) => hit.document) ||
      []) as PageSearchDocument[];
  } catch (error) {
    console.error('Failed to perform instant search:', error);
    return [];
  }
}

export async function getPageTypes({
  limit = 100,
}: {
  limit?: number;
} = {}): Promise<PageTypeFacet[]> {
  try {
    const result = await client
      .collections(TYPESENSE_COLLECTION)
      .documents()
      .search<any>({
        q: '*',
        facet_by: 'type',
        max_facet_values: limit,
        per_page: 0,
      });

    const facetCounts = result.facet_counts?.find(
      (facet: any) => facet.field_name === 'type',
    );

    const types = (facetCounts?.counts || [])
      .map((facet: any) => ({
        value: String(facet.value || ''),
        count: Number(facet.count || 0),
      }))
      .filter((facet: PageTypeFacet) => facet.value.trim().length > 0)
      .sort((a: PageTypeFacet, b: PageTypeFacet) =>
        a.value.localeCompare(b.value),
      );

    return types;
  } catch (error) {
    console.error('Failed to fetch page type facets:', error);
    return [];
  }
}

export async function getPopularSearches({
  query = '',
  limit = 10,
}: {
  query?: string;
  limit?: number;
} = {}): Promise<PopularQuery[]> {
  try {
    const trimmedQuery = query.trim();
    const result = await client
      .collections(POPULAR_QUERIES_COLLECTION)
      .documents()
      .search<any>({
        q: trimmedQuery || '*',
        query_by: 'q',
        sort_by: 'count:desc',
        limit,
      });

    return (result.hits?.map((hit: any) => hit.document) ||
      []) as PopularQuery[];
  } catch (error) {
    console.error('Failed to fetch popular searches:', error);
    return [];
  }
}
