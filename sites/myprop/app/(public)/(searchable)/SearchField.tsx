'use client';
import { Select } from '@/components/Select';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const searchOptions = [
  { value: 'owner', label: 'Owner Search' },
  { value: 'buyer', label: 'Buyer Search' },
  { value: 'address', label: 'Address Search' },
  { value: 'subdivision', label: 'Subdivision Search' },
  { value: 'subdivision2', label: 'Subdivision ID Search' },
  { value: 'taxid', label: 'Tax ID Search' },
  { value: 'parcel', label: 'Parcel Search' },
];

export function SearchField() {
  const searchParams = useSearchParams();
  const [searchType, setSearchType] = useState(
    searchParams.get('type') || 'owner',
  );
  const [query, setQuery] = useState(searchParams.get('query') || '');
  const router = useRouter();

  const timeout = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    timeout.current = setTimeout(() => {
      const params = new URLSearchParams();
      if (searchType) {
        params.set('type', searchType);
      }
      if (query) {
        params.set('query', query);
      }
      const queryString = params.toString();
      const url = `/search${queryString ? `?${queryString}` : ''}`;
      router.replace(url);
    }, 500);
  }, [searchType, query, router]);

  return (
    <fieldset className="border-border bg-surface mx-auto mb-16 max-w-185 border p-2 pt-0">
      <legend className="text-xs font-semibold">Search</legend>
      <form className="flex items-end gap-1">
        <Select
          options={searchOptions}
          name="search-type"
          label="Select Search Type"
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search..."
          name="query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full"
        />
      </form>
    </fieldset>
  );
}
