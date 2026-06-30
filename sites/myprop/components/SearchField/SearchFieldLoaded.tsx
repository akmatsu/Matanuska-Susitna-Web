'use client';
import { useSearchParams } from 'next/navigation';
import { Select } from '../Select';
import { useRouter } from 'nextjs-toploader/app';
import { useState } from 'react';

const searchOptions = [
  { value: 'wild', label: 'Search by all fields' },
  { value: 'owner', label: 'Owner Name Search' },
  { value: 'address', label: 'Address Search' },
  { value: 'tax', label: 'Tax ID Search' },
  { value: 'parcel', label: 'PID Search' },
  { value: 'sub', label: 'Subdivision Search' },
  { value: 'subid', label: 'Subdivision ID Search' },
];

export function SearchFieldLoaded() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [currentMode, setCurrentMode] = useState(
    searchParams.get('mode') || 'wild',
  );

  return (
    <fieldset className="border-border bg-surface mx-auto mb-4 max-w-185 border px-2 pt-0 pb-3">
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
          key={searchParams.get('mode') || 'wild'}
          options={searchOptions}
          onChange={(e) => setCurrentMode(e.target.value)}
          name="search-type"
          defaultValue={searchParams.get('mode') || 'wild'}
          id="search-type"
          className="p-2 sm:px-1 sm:py-0"
        />
        <label htmlFor="search-query" className="sr-only">
          Search Query
        </label>
        <input
          key={searchParams.get('query') || ''}
          type="text"
          placeholder={(() => {
            switch (currentMode) {
              case 'owner':
                return 'Search for property by owner name';
              case 'address':
                return 'Search for property by address';
              case 'parcel':
                return 'Search for property by PID';
              case 'tax':
                return 'Search for property by tax ID';
              case 'sub':
                return 'Search for subdivisions by name';
              case 'subid':
                return 'Search for property by subdivision ID';
              default:
                return 'Search for properties by all fields (owner name, address, PID, tax ID, subdivision name, subdivision ID)';
            }
          })()}
          name="query"
          id="search-query"
          className="w-full p-2 sm:px-1 sm:py-0"
          defaultValue={searchParams.get('query') || ''}
          aria-describedby="search-help-text"
          autoFocus
        />
        <button type="submit" className="px-2 py-1 sm:px-1 sm:py-0">
          Search
        </button>
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
