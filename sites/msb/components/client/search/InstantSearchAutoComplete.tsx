'use client';
import { Configure } from 'react-instantsearch';
import { Autocomplete } from './Autocomplete';
import { InstantSearchWrapper } from '../../static/search/InstantSearchWrapper';

export function InstantSearchAutoComplete() {
  return (
    <InstantSearchWrapper indexName="pages">
      <Configure hitsPerPage={5} />
      <Autocomplete />
    </InstantSearchWrapper>
  );
}
