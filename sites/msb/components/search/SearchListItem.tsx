import { LinkCard, CardHeader, CardBody } from '@matsugov/ui';
import Link from 'next/link';

export function SearchListItem({
  item,
  listKey,
}: {
  item: { description: string; title: string; slug: string };
  listKey: string;
}) {
  return (
    <LinkCard href={`/${listKey}/${item.slug}`} as="li" linkAs={Link}>
      <CardHeader>
        <h4 className="usa-card__heading margin-bottom-0">{item.title}</h4>
        <CardBody>
          <p>{item.description}</p>
        </CardBody>
      </CardHeader>
    </LinkCard>
  );
}
