'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { SearchFieldBody } from './SearchFieldBody';

const searchOptions = [
  { value: 'wild', label: 'Property Search' },
  { value: 'sub', label: 'Subdivision Search' },
  { value: 'subid', label: 'Subdivision ID Search' },
];

export function SearchFieldLoaded() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchParamsObj = {
    type: searchParams.get('type') || undefined,
    query: searchParams.get('query') || undefined,
  };

  return (
    <SearchFieldBody
      searchParams={searchParamsObj}
      searchOptions={searchOptions}
      handleSubmit={async (formData: FormData) => {
        const searchType = formData.get('search-type');
        const query = formData.get('query');

        if (typeof searchType === 'string' && typeof query === 'string') {
          const params = new URLSearchParams();
          if (searchType?.length) params.set('mode', searchType);
          if (query?.length) params.set('query', query);

          const searchUrl = `/search?${params.toString()}`;
          router.push(searchUrl);
        } else {
          console.error('Invalid form data:', { searchType, query });
        }
      }}
    />
  );
}
