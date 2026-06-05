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
}: {
  query: string;
  page?: number;
  perPage?: number;
}): Promise<PageSearchResult> {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
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
      q: trimmedQuery,
      query_by: 'title,embedding,description,body',
      sort_by: '_text_match:desc,title:asc',
      query_by_weights: '4,2,2,1',
      text_match_type: 'max_weight',
      exclude_fields: 'embedding',
      vector_query: 'embedding:([],  distance_threshold:0.83)',
      enable_synonyms: true,
      num_typos: 2,
      min_len_1typo: 4,
      min_len_2typo: 8,
      drop_tokens_threshold: 1,
      prioritize_exact_match: true,
      prioritize_token_position: true,
      nl_model_id: 'cms-nl-search-model',
      nl_query: true,
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

export async function getPopularSearches({
  limit = 10,
}: {
  limit?: number;
} = {}): Promise<PopularQuery[]> {
  try {
    const result = await client
      .collections(POPULAR_QUERIES_COLLECTION)
      .documents()
      .search<any>({
        q: '*',
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
