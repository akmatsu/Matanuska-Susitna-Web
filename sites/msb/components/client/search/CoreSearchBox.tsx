'use client';
import { Search } from '@matsugov/ui/Search';
import type { ChangeEvent } from 'react';
import { useSearchBox } from 'react-instantsearch';

export function CoreSearchBox() {
  const { query, refine } = useSearchBox();
  function handleSubmit(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();

    refine(event.currentTarget.value);
  }
  return (
    <Search
      defaultValue={query}
      onChange={handleSubmit}
      onSubmit={(e) => e.preventDefault()}
      useIcon
    />
  );
}
