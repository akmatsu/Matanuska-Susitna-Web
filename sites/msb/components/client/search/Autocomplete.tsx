'use client';
import { Combobox } from '@matsugov/ui/Combobox';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';

type PopularSearchSuggestion = {
  id: string;
  title: string;
  type: string;
  description: string;
};

type AutocompleteProps = {
  defaultQuery?: string;
  autoFocus?: boolean;
  initialPopularSearches?: Array<{ q: string; count: number }>;
};

export function Autocomplete({
  defaultQuery = '',
  autoFocus = false,
  initialPopularSearches = [],
}: AutocompleteProps) {
  const [query, setQuery] = useState(defaultQuery);
  const [popularSearches, setPopularSearches] = useState(
    initialPopularSearches.map((item) => item.q),
  );
  const containerRef = useRef<HTMLDivElement>(null);

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

  // Attach keydown handler to the input element
  useEffect(() => {
    const input = containerRef.current?.querySelector('input');
    if (!input) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        submitSearch(query);
      }
    };

    input.addEventListener('keydown', handleKeyDown);
    return () => input.removeEventListener('keydown', handleKeyDown);
  }, [query]);
  const suggestions = useMemo(() => {
    const searchTerm = query.trim().toLowerCase();
    const filtered = searchTerm.length
      ? popularSearches.filter((item) =>
          item.toLowerCase().includes(searchTerm),
        )
      : popularSearches;

    return filtered.slice(0, 8).map((item) => ({
      id: item,
      title: item,
      type: 'Popular Search',
      description: 'Press Enter to search',
    }));
  }, [query, popularSearches]);

  function submitSearch(searchQuery: string) {
    const trimmedQuery = searchQuery.trim();
    if (!trimmedQuery) {
      return;
    }
    router.push(`/search?query=${encodeURIComponent(trimmedQuery)}`);
  }

  function onChange(value?: PopularSearchSuggestion | null) {
    // Only submit if a suggestion was explicitly selected
    if (value?.title && value.type === 'Popular Search') {
      submitSearch(value.title);
    }
  }

  return (
    <div ref={containerRef}>
      <Combobox<PopularSearchSuggestion>
        label="Search website"
        displayValueKey="title"
        displayTypeKey="type"
        idKey="id"
        descriptionKey="description"
        items={suggestions}
        onChangeQuery={(e) => setQuery(e.target.value)}
        onChange={onChange}
        placeholder="Search Website..."
        autoFocus={autoFocus}
      />
    </div>
  );
}
