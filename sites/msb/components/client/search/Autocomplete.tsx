'use client';
import { useConnector } from 'react-instantsearch';
import connectAutocomplete, {
  type AutocompleteConnectorParams,
} from 'instantsearch.js/es/connectors/autocomplete/connectAutocomplete';
import { Combobox } from '@matsugov/ui/Combobox';
import { Hit } from 'instantsearch.js';
import { useRouter } from 'next/navigation';
import pluralize from 'pluralize';
import slugify from 'voca/slugify';

type UseAutocompleteProps = AutocompleteConnectorParams;

function useAutocomplete(props?: UseAutocompleteProps) {
  return useConnector(connectAutocomplete, props, { skipSuspense: true });
}

export function Autocomplete() {
  const { indices, refine } = useAutocomplete();

  const router = useRouter();

  function onChange(value?: Hit | null) {
    const hitType = !value
      ? undefined
      : value?.type === 'orgUnit' ||
          value?.type === 'org-unit' ||
          value?.type === 'office' ||
          value?.type === 'division' ||
          value?.type === 'department' ||
          value?.type === 'Departments & Divisions' 
        ? 'department'
        : value?.type === 'community_council' ||
            value?.type === 'ssa_board' ||
            value?.type === 'fsa_board' ||
            value?.type === 'rsa_board'
          ? 'board'
          : value?.type === 'city' || value?.type === 'community'
            ? 'community'
            : value?.type === 'legislative' || value?.type === 'strategic'
              ? 'plan'
              : value?.type === 'AKMATSUGOV_PublicNotice' ||
                  value?.type === 'MSB_AirQuality' ||
                  value?.type === 'AKMATSUGOV_CommunityDevelopment' ||
                  value?.type === 'MSB_RoadConstruction'
                ? 'public-notice'
                : value?.type;

    if (value?.url) {
      router.push(value.url);
    } else if (value?.slug) {
      const type = slugify(hitType ? pluralize(hitType) : '');
      router.push(
        type === 'topics' ? `/${value.slug}` : `/${type}/${value.slug}`,
      );
    } else if (value?.title) {
      router.push(`/search?pages[query]=${value.title}`);
    }
  }

  return (
    <Combobox<Hit>
      displayValueKey="title"
      displayTypeKey="type"
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
