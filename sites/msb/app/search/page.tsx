import { Autocomplete } from '@/components/client/search/Autocomplete';
import { QuerySearchResults } from '@/components/static/search/QuerySearchResults';
import { PageContainer } from '@/components/static/Page/PageContainer';
import { Metadata } from 'next';
import { getPageTypes, getPopularSearches } from '@/utils/search/typesense';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'MSB - Search',
  description: 'Search the Matanuska-Susitna Borough website',
};

export default async function SearchPage(props: PageProps<'/search'>) {
  const searchParams = await props.searchParams;
  const query =
    (Array.isArray(searchParams.query)
      ? searchParams.query[0]
      : searchParams.query) ||
    (Array.isArray(searchParams['pages[query]'])
      ? searchParams['pages[query]'][0]
      : searchParams['pages[query]']) ||
    '';
  const pageParam = Array.isArray(searchParams.page)
    ? searchParams.page[0]
    : searchParams.page;

  const typeParam =
    (Array.isArray(searchParams.type)
      ? searchParams.type[0]
      : searchParams.type) ||
    (Array.isArray(searchParams['pages[type]'])
      ? searchParams['pages[type]'][0]
      : searchParams['pages[type]']) ||
    '';

  const type = typeParam.trim();
  const page = Number.isInteger(Number(pageParam))
    ? Math.max(1, Number(pageParam))
    : 1;

  const [popularSearches, pageTypes] = await Promise.all([
    getPopularSearches({ limit: 10 }),
    getPageTypes({ limit: 100 }),
  ]);

  return (
    <PageContainer size="lg">
      <h1 className="mb-4 text-3xl font-bold">Search</h1>
      <Autocomplete
        defaultQuery={query}
        defaultType={type}
        availableTypes={pageTypes.map((item) => item.value)}
        autoFocus
        initialPopularSearches={popularSearches}
      />
      {query || type ? (
        <QuerySearchResults
          query={query}
          page={page}
          type={type || undefined}
        />
      ) : (
        <p className="text-msb-base-dark mt-4">
          Enter a search query, choose an optional type filter, and select
          Search.
        </p>
      )}
    </PageContainer>
  );
}
