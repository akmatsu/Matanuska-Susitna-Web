import { Select } from '@/components/Select';
import { redirect } from 'next/navigation';

export function SearchField() {
  const searchOptions = [
    { value: 'owner', label: 'Owner Search' },
    { value: 'buyer', label: 'Buyer Search' },
    { value: 'address', label: 'Address Search' },
    { value: 'subdivision', label: 'Subdivision Search' },
    { value: 'subdivision2', label: 'Subdivision ID Search' },
    { value: 'taxid', label: 'Tax ID Search' },
    { value: 'parcel', label: 'Parcel Search' },
  ];

  async function handleSearchSubmit(form: FormData) {
    'use server';
    const searchType = form.get('search-type');
    const query = form.get('query');

    return redirect(`/search?type=${searchType}&query=${query}`, 'push');
  }

  return (
    <fieldset className="mb-16 border border-gray-400 bg-gray-100 p-2 pt-0">
      <legend className="text-xs font-semibold">Search</legend>
      <form className="flex items-end gap-1" action={handleSearchSubmit}>
        <Select
          options={searchOptions}
          name="search-type"
          label="Select Search Type"
        />
        <input type="text" placeholder="Search..." name="query" />
        <button title="Search">Search</button>
      </form>
    </fieldset>
  );
}
