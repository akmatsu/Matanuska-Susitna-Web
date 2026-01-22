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
          key={item.id}
          item={item}
          listKey={pluralize(
            item.type === 'orgUnit' ||
              item.type === 'org-unit' ||
              item.type === 'office' ||
              item.type === 'division' ||
              item.type === 'department' ||
              item.type === 'Departments & Divisions'
              ? 'department'
              : item.type === 'community_council' ||
                  item.type === 'ssa_board' ||
                  item.type === 'fsa_board' ||
                  item.type === 'rsa_board'
                ? 'board'
                : item.type === 'city' || item.type === 'community'
                  ? 'community'
                  : item.type === 'legislative' || item.type === 'strategic'
                    ? 'plan'
                    : item.type === 'AKMATSUGOV_PublicNotice' ||
                        item.type === 'MSB_AirQuality' ||
                        item.type === 'AKMATSUGOV_CommunityDevelopment' ||
                        item.type === 'MSB_RoadConstruction'
                      ? 'public-notice'
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
