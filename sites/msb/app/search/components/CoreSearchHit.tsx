import { SearchListItem } from '@/components/search/SearchListItem';
import pluralize from 'pluralize';
import { ComponentProps } from 'react';
import { Hits, useHits } from 'react-instantsearch';

export function CoreSearchHits(props: ComponentProps<typeof Hits>) {
  const { items } = useHits(props);

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
      {items.length === 0 && <p>No Results</p>}
    </ul>
  );
}
