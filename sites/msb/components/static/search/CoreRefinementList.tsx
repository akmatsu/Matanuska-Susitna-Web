import { Card, CardBody, CardHeader, CardTitle } from '@matsugov/ui/Card';
import { Checkbox } from '@matsugov/ui/Checkbox';
import clsx from 'clsx';
import { RefinementListProps, useRefinementList } from 'react-instantsearch';

export function CustomRefinementList(props: RefinementListProps) {
  const { items, refine, toggleShowMore, isShowingMore, canToggleShowMore } =
    useRefinementList(props);

  function getLabel(str: string) {
    if (props.attribute === 'related_pages') {
      const index = str.indexOf(':');
      return index !== -1 ? str.slice(index + 1) : str;
    }
    return str;
  }

  const text = isShowingMore ? 'Show less' : 'Show more';

  return (
    <Card>
      <CardHeader>
        <CardTitle>{props.title}</CardTitle>
      </CardHeader>
      <CardBody className="overflow-y-auto">
        <ul role="list" className="flex flex-col gap-4 mb-4">
          {items.map((item) => (
            <li key={item.label}>
              <Checkbox
                checked={item.isRefined}
                onChange={() => refine(item.value)}
                label={`${getLabel(item.label)} (${item.count})`}
              />
            </li>
          ))}
        </ul>
        {canToggleShowMore && (
          <button
            className={clsx(
              'cursor-pointer text-primary after:align-middle after:size-5 after:icon-[mdi--chevron-down] after:transition-transform after:duration-300',
              {
                'after:rotate-180': isShowingMore,
              },
            )}
            onClick={toggleShowMore}
          >
            {text}
          </button>
        )}
      </CardBody>
    </Card>
  );
}
