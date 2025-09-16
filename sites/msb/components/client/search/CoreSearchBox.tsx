'use client';
import { Search } from '@matsugov/ui/Search';
import type { ChangeEvent } from 'react';
import {
  SearchBoxProps,
  useInstantSearch,
  useSearchBox,
} from 'react-instantsearch';

export function CoreSearchBox(props: SearchBoxProps) {
  const { query, refine } = useSearchBox(props, { skipSuspense: true });
  const { status, error } = useInstantSearch();

  function handleSubmit(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();

    refine(event.currentTarget.value);
  }

  return (
    <>
      <Search
        defaultValue={query}
        onChange={handleSubmit}
        onSubmit={(e) => e.preventDefault()}
        useIcon
        loading={status === 'stalled' || status === 'loading'}
      />
      {status === 'error' && (
        <p className="text-error">Error: {error?.message}</p>
      )}
    </>
  );
}
