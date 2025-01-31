import { LinkCard, CardHeader, CardBody, CardTitle } from '@matsugov/ui';
import Link from 'next/link';

export function SearchListItem({
  item,
  listKey,
}: {
  item: { description: string; title: string; slug: string; url?: string };
  listKey: string;
}) {
  const url = item.url || `/${listKey}/${item.slug}`;
  return (
    <LinkCard href={url} as="li" linkAs={Link}>
      <CardHeader>
        <CardTitle>{item.title}</CardTitle>
      </CardHeader>
      <CardBody>
        <p>{item.description}</p>
      </CardBody>
    </LinkCard>
  );
}
