'use client';
import { Button } from '@matsugov/ui/Button';
import { Combobox } from '@matsugov/ui/Combobox';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

type PopularSearchSuggestion = {
  id: string;
  title: string;
  type: string;
  description: string;
};

type AutocompleteProps = {
  defaultQuery?: string;
  defaultType?: string;
  autoFocus?: boolean;
  initialPopularSearches?: Array<{ q: string; count: number }>;
  availableTypes?: string[];
  variant?: 'default' | 'home';
};

export function Autocomplete({
  defaultQuery = '',
  defaultType = '',
  autoFocus = false,
  initialPopularSearches = [],
  availableTypes = [],
  variant = 'default',
}: AutocompleteProps) {
  const isHomeVariant = variant === 'home';

  const [query, setQuery] = useState(defaultQuery);
  const [typedQuery, setTypedQuery] = useState(defaultQuery);
  const [selectedType, setSelectedType] = useState(defaultType);
  const [popularSearches, setPopularSearches] = useState(
    initialPopularSearches.map((item) => item.q),
  );
  const [error, setError] = useState('');
  const submittedQueryRef = useRef<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    if (initialPopularSearches.length) return;

    const fetchPopularSearches = async () => {
      try {
        const response = await fetch('/api/search/popular');
        if (response.ok) {
          const data = await response.json();
          setPopularSearches(data.queries.map((item: any) => item.q));
        }
      } catch (error) {
        console.error('Failed to fetch popular searches:', error);
      }
    };

    fetchPopularSearches();
  }, [initialPopularSearches.length]);

  const submitSearch = useCallback(
    (searchQuery: string, searchType: string) => {
      const trimmedQuery = searchQuery.trim();
      const trimmedType = searchType.trim();

      // Allow submission if query is present OR type is selected
      if (!trimmedQuery && !trimmedType) {
        if (isHomeVariant) {
          router.push('/search');
        }
        return;
      }

      const params = new URLSearchParams();
      if (trimmedQuery) {
        params.set('query', trimmedQuery);
      }
      if (trimmedType) {
        params.set('type', trimmedType);
      }

      router.push(`/search?${params.toString()}`);
    },
    [isHomeVariant, router],
  );

  const suggestions = useMemo(() => {
    const searchTerm = typedQuery.trim().toLowerCase();
    const filtered = searchTerm.length
      ? popularSearches.filter((item) =>
          item.toLowerCase().includes(searchTerm),
        )
      : popularSearches;

    return filtered.slice(0, 8).map((item) => ({
      id: item,
      title: item,
      type: 'Popular Search',
      description: 'Select to fill query',
    }));
  }, [typedQuery, popularSearches]);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const submittedQuery = query.trim();
    const trimmedType = selectedType.trim();

    if (!submittedQuery && !trimmedType) {
      setError('Please enter a search query or select a type to continue.');
      return;
    }

    setError('');
    submittedQueryRef.current = submittedQuery;
    setQuery(submittedQuery);
    setTypedQuery(submittedQuery);
    submitSearch(submittedQuery, selectedType);
  }

  function onChange(value?: PopularSearchSuggestion | null) {
    if (!value?.title) {
      return;
    }

    setError('');
    submittedQueryRef.current = value.title;
    setTypedQuery(value.title);
    setQuery(value.title);
    submitSearch(value.title, isHomeVariant ? '' : selectedType);
  }

  function onActiveItemChange(value?: PopularSearchSuggestion | null) {
    if (!value?.title) {
      if (submittedQueryRef.current !== null) {
        setQuery(submittedQueryRef.current);
        setTypedQuery(submittedQueryRef.current);
        return;
      }

      setQuery(typedQuery);
      return;
    }

    setQuery(value.title);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div
        className={
          isHomeVariant
            ? 'flex items-stretch overflow-hidden rounded-xs border border-white/70 bg-white shadow-lg backdrop-blur'
            : 'grid gap-3 md:grid-cols-[minmax(0,1fr)_220px_auto] md:items-end'
        }
      >
        <div className={isHomeVariant ? 'min-w-0 flex-1' : ''}>
          <Combobox<PopularSearchSuggestion>
            label="Search website"
            displayValueKey="title"
            displayTypeKey="type"
            idKey="id"
            descriptionKey="description"
            items={suggestions}
            onChangeQuery={(e) => {
              setError('');
              submittedQueryRef.current = null;
              setQuery(e.target.value);
              setTypedQuery(e.target.value);
            }}
            onChange={onChange}
            onActiveItemChange={onActiveItemChange}
            placeholder={
              isHomeVariant
                ? 'Search services, pages, and departments'
                : 'Search website'
            }
            autoFocus={autoFocus}
            value={query ? ({ title: query } as PopularSearchSuggestion) : null}
            queryOptionValue={typedQuery}
            inputClassName={
              isHomeVariant
                ? 'h-12 rounded-none border-none bg-transparent px-4 text-base shadow-none focus:ring-0'
                : undefined
            }
          />
        </div>

        {!isHomeVariant && (
          <div>
            <label htmlFor="search-type" className="mb-1 block font-semibold">
              Type
            </label>
            <select
              id="search-type"
              value={selectedType}
              onChange={(e) => {
                setError('');
                setSelectedType(e.target.value);
              }}
              className="focus-ring border-msb-base-lighter h-10 w-full cursor-pointer rounded border bg-white px-2 shadow-md"
            >
              <option value="">All types</option>
              {availableTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        )}

        <Button
          type="submit"
          color="primary"
          className={
            isHomeVariant
              ? 'border-primary-dark h-12 rounded-none border-l px-4'
              : 'h-10 px-4'
          }
          size="sm"
          aria-label="Search"
        >
          {isHomeVariant ? (
            <span aria-hidden="true" className="icon-[mdi--magnify] size-5" />
          ) : (
            'Search'
          )}
        </Button>
      </div>
      {error && (
        <div
          role="alert"
          className="rounded border border-red-500 bg-red-50 px-4 py-3 text-red-700"
        >
          {error}
        </div>
      )}
    </form>
  );
}
