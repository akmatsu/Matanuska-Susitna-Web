import { SearchListItem } from './SearchListItem';
import pluralize from 'pluralize';
import { ComponentProps } from 'react';
import { Hits, useHits, useInstantSearch } from 'react-instantsearch';

export function CoreSearchHits(props: ComponentProps<typeof Hits>) {
  const { items } = useHits(props, { skipSuspense: true });
  const { status } = useInstantSearch();

  return (
    <ul role="list" className="flex flex-col gap-4 mb-4">
      {items.map((item: any) => (
        <SearchListItem
          key={item.slug}
          item={item}
          listKey={pluralize(
            item.type === 'orgUnit' || item.type === 'org-unit'
              ? 'department'
              : item.type,
          )}
        />
      ))}
      {items.length === 0 && status !== 'stalled' && status !== 'loading' && (
        <p>No Results</p>
      )}

      {items.length === 0 && (status === 'stalled' || status === 'loading') && (
        <p>Loading...</p>
      )}
    </ul>
  );
}
