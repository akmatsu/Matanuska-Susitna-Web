'use client';
import { Search } from '@matsugov/ui/Search';
import type { ChangeEvent } from 'react';
import { SearchBoxProps, useSearchBox } from 'react-instantsearch';

export function CoreSearchBox(props: SearchBoxProps) {
  const { query, refine } = useSearchBox(props, { skipSuspense: true });
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
