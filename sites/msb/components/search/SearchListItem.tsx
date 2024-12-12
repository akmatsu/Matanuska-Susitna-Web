import { CardBody, CardHeader } from '@trussworks/react-uswds';
import { LinkCard } from '../LinkCard';

export function SearchListItem({
  item,
  listKey,
}: {
  item: { description: string; title: string; slug: string };
  listKey: string;
}) {
  return (
    <LinkCard className="margin-bottom-2" href={`/${listKey}/${item.slug}`}>
      <CardHeader className="padding-top-2">
        <h4 className="usa-card__heading margin-bottom-0">{item.title}</h4>
        <CardBody>
          <p>{item.description}</p>
        </CardBody>
      </CardHeader>
    </LinkCard>
  );
}
