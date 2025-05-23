'use client';
import { useConnector } from 'react-instantsearch';

import connectAutocomplete, {
  type AutocompleteConnectorParams,
} from 'instantsearch.js/es/connectors/autocomplete/connectAutocomplete';

import { Combobox } from '@matsugov/ui/client';
import { Hit } from 'instantsearch.js';
import { useRouter } from 'next/navigation';
import pluralize from 'pluralize';
import { toKebabCase } from '@/utils/stringHelpers';

type UseAutocompleteProps = AutocompleteConnectorParams;

function useAutocomplete(props?: UseAutocompleteProps) {
  return useConnector(connectAutocomplete, props);
}

export function Autocomplete() {
  const { indices, refine } = useAutocomplete();

  const router = useRouter();

  function onChange(value?: Hit | null) {
    console.log(value?.type);
    const hitType = !value
      ? undefined
      : value?.type === 'orgUnit' || value?.type === 'org-unit'
        ? 'department'
        : value?.type;
    if (value?.url) {
      router.push(value.url);
    } else if (value?.slug) {
      const type = toKebabCase(hitType ? '/' + pluralize(hitType) : '');
      router.push(`${type}/${value.slug}`);
    } else if (value?.title) {
      router.push(`/search?pages[query]=${value.title}`);
    }
  }

  return (
    <Combobox<Hit>
      displayValueKey="title"
      idKey="id"
      descriptionKey="description"
      items={indices[0].hits}
      onChangeQuery={(e) => refine(e.target.value)}
      onChange={onChange}
      placeholder="Search Website..."
      autoFocus
    />
  );
}
