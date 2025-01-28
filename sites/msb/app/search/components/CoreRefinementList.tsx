import { Card, CardBody, CardHeader, CardTitle, Checkbox } from '@matsugov/ui';
import { RefinementListProps, useRefinementList } from 'react-instantsearch';

export function CustomRefinementList(props: RefinementListProps) {
  const { items, refine } = useRefinementList(props);

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
                onChange={(e) => refine(item.value)}
                label={`${item.label} (${item.count})`}
              />
            </li>
          ))}
        </ul>
      </CardBody>
    </Card>
  );
}
