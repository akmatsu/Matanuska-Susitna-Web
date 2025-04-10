'use client';
import { Configure } from 'react-instantsearch';
import { Autocomplete } from './Autocomplete';
import { InstantSearchWrapper } from './InstantSearchWrapper';

export function InstantSearchAutoComplete() {
  return (
    <InstantSearchWrapper indexName="pages">
      <Configure
        hitsPerPage={5}
        filters={`published_at:<=${Math.floor(Date.now() / 1000)}`}
      />
      <Autocomplete />
    </InstantSearchWrapper>
  );
}
