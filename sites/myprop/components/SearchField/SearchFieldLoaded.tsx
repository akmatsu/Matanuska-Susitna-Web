import { redirect } from 'next/navigation';
import { SearchFieldBody } from './SearchFieldBody';

const searchOptions = [
  { value: 'wild', label: 'Property Search' },
  { value: 'sub', label: 'Subdivision Search' },
  { value: 'subid', label: 'Subdivision ID Search' },
];

export async function SearchFieldLoaded(props: {
  searchParams?: Promise<Record<string, string | string[]>>;
}) {
  const searchParams = await props.searchParams;

  return (
    <SearchFieldBody
      searchParams={searchParams}
      searchOptions={searchOptions}
      handleSubmit={async (FormData) => {
        'use server';
        const searchType = FormData.get('search-type')?.toString();
        const query = FormData.get('query')?.toString();

        if (typeof searchType === 'string' && typeof query === 'string') {
          const params = new URLSearchParams();
          if (searchType?.length) params.set('mode', searchType);
          if (query?.length) params.set('query', query);

          const searchUrl = `/search?${params.toString()}`;
          redirect(searchUrl, 'push');
        }
      }}
    />
  );
}
