import { Card, CardBody, CardHeader, CardTitle } from '@matsugov/ui/Card';
import { Checkbox } from '@matsugov/ui/Checkbox';
import { RefinementListProps, useRefinementList } from 'react-instantsearch';

export function CustomRefinementList(props: RefinementListProps) {
  const { items, refine } = useRefinementList(props);

  function getLabel(str: string) {
    if (props.attribute === 'related_pages') {
      const index = str.indexOf(':');
      return index !== -1 ? str.slice(index + 1) : str;
    }
    return str;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{props.title}</CardTitle>
      </CardHeader>
      <CardBody>
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
      </CardBody>
    </Card>
  );
}
