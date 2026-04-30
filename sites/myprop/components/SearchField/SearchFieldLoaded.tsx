'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Select } from '../Select';

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

  const [searchType, setSearchType] = useState(searchParamsObj.type || 'wild');
  const [searchQuery, setSearchQuery] = useState(searchParamsObj.query || '');

  return (
    <fieldset className="border-border bg-surface mx-auto mb-16 max-w-185 border p-2 pt-0">
      <legend className="text-xs font-semibold">Search</legend>
      <form
        className="mb-2 flex flex-col gap-1 sm:flex-row"
        onSubmit={(e) => {
          e.preventDefault();
          const params = new URLSearchParams();
          if (searchType?.length) params.set('mode', searchType);
          if (searchQuery?.length) params.set('query', searchQuery);

          const searchUrl = `/search?${params.toString()}`;
          router.push(searchUrl);
        }}
      >
        <label htmlFor="search-type" className="sr-only">
          Search Type
        </label>
        <Select
          options={searchOptions}
          name="search-type"
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
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
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
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
