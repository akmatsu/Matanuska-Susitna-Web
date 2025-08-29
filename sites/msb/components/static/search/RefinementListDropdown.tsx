'use client';
import { DropdownButton } from '@matsugov/ui';
import { RefinementListProps, useRefinementList } from 'react-instantsearch';

export function RefinementListDropdown(props: RefinementListProps) {
  const {
    items,
    refine,
    canToggleShowMore,
    isShowingMore,
    toggleShowMore,
    isFromSearch,
  } = useRefinementList(props);

  function getLabel(str: string) {
    if (props.attribute === 'related_pages') {
      const index = str.indexOf(':');
      return index !== -1 ? str.slice(index + 1) : str;
    }
    return str;
  }

  if (!items?.length && !isFromSearch) return null;

  return (
    <DropdownButton
      label={props.title}
      buttonProps={{
        size: 'sm',
        color: 'primary',
        shadow: false,
        title: `View ${props.title} filters menu`,
      }}
      checkBoxes
      items={items.map((item) => ({
        label: `${getLabel(item.label)} (${item.count})`,
        isChecked: item.isRefined,
        action() {
          refine(item.value);
        },
      }))}
      appendBottom={
        canToggleShowMore && (
          <button
            className="text-primary hover:text-primary-dark cursor-pointer w-fit mt-2"
            onClick={toggleShowMore}
          >
            {isShowingMore ? 'Show less' : 'Show more'}
          </button>
        )
      }
    ></DropdownButton>
  );
}
