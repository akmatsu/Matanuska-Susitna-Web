import { LinkCard, CardHeader, CardBody, CardTitle } from '@matsugov/ui';
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
        <CardTitle>{item.title}</CardTitle>
      </CardHeader>
      <CardBody>
        <p>{item.description}</p>
      </CardBody>
    </LinkCard>
  );
}
