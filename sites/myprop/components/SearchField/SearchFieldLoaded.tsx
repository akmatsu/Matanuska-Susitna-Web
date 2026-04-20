import { getSearchParams } from '@/utils/serverHelpers';
import { redirect } from 'next/navigation';
import { SearchFieldBody } from './SearchFieldBody';

const searchOptions = [
  { value: 'owner', label: 'Owner Search' },
  { value: 'buyer', label: 'Buyer Search' },
  { value: 'address', label: 'Address Search' },
  { value: 'subdivision', label: 'Subdivision Search' },
  { value: 'subdivision2', label: 'Subdivision ID Search' },
  { value: 'taxid', label: 'Tax ID Search' },
  { value: 'parcel', label: 'Parcel Search' },
];

export async function SearchFieldLoaded() {
  const searchParams = await getSearchParams();

  async function handleSubmit(formData: FormData) {
    'use server';
    const searchType = formData.get('search-type');
    const query = formData.get('query');

    if (typeof searchType === 'string' && typeof query === 'string') {
      const params = new URLSearchParams();
      if (searchType?.length) params.set('type', searchType);
      if (query?.length) params.set('query', query);

      const searchUrl = `/search?${params.toString()}`;
      redirect(searchUrl);
    } else {
      console.error('Invalid form data:', { searchType, query });
    }
  }

  return (
    <SearchFieldBody
      searchParams={searchParams}
      searchOptions={searchOptions}
      handleSubmit={handleSubmit}
    />
  );
}
