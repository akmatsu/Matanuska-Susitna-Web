'use client';
import { useSearchParams } from 'next/navigation';
import { Select } from '../Select';
import { useRouter } from 'nextjs-toploader/app';

const searchOptions = [
  { value: 'wild', label: 'Property Search' },
  { value: 'sub', label: 'Subdivision Search' },
  { value: 'subid', label: 'Subdivision ID Search' },
];

export function SearchFieldLoaded() {
  const searchParams = useSearchParams();
  const router = useRouter();

  return (
    <fieldset className="border-border bg-surface mx-auto mb-16 max-w-185 border p-2 pt-0">
      <legend className="text-xs font-semibold">Search</legend>
      <form
        className="mb-2 flex flex-col gap-1 sm:flex-row"
        onSubmit={(e) => {
          e.preventDefault();

          const formData = new FormData(e.currentTarget);
          const type = formData.get('search-type');
          const query = formData.get('query');
          if (!query || String(query).length === 0) return;
          const newSearchParams = new URLSearchParams(searchParams.toString());
          newSearchParams.set('mode', String(type));
          newSearchParams.set('query', String(query));
          router.push(`/search?${newSearchParams.toString()}`);
        }}
      >
        <label htmlFor="search-type" className="sr-only">
          Search Type
        </label>
        <Select
          options={searchOptions}
          name="search-type"
          defaultValue={searchParams.get('mode') || 'owner'}
          id="search-type"
        />
        <label htmlFor="search-query" className="sr-only">
          Search Query
        </label>
        <input
          type="text"
          placeholder="Search for by name, address, or parcel ID..."
          name="query"
          id="search-query"
          className="w-full"
          defaultValue={searchParams.get('query') || ''}
          aria-describedby="search-help-text"
          autoFocus
        />
        <button type="submit">Search</button>
      </form>
      <div className="flex items-start gap-1" id="search-help-text">
        <span
          className="icon icon-[mdi--info] size-4 text-blue-600"
          aria-hidden="true"
        />
        <p className="text-xs italic">
          If searching by owner/buyer name, search by last name first. For
          example, to search for &quot;Bill Jones&quot;, enter &quot;Jones
          Bill&quot; or just &quot;Jones&quot;.
        </p>
      </div>
    </fieldset>
  );
}
