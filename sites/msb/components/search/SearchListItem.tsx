import { LinkCard, CardHeader, CardBody, CardTitle } from '@matsugov/ui';
import Link from 'next/link';

export function SearchListItem({
  item,
  listKey,
  className,
}: {
  item: {
    description: string;
    title: string;
    slug: string;
    url?: string;
    [key: string]: any;
  };
  listKey: string;
  className?: string;
}) {
  const url = item.url || `/${listKey}/${item.slug}`;
  return (
    <LinkCard href={url} as="li" linkAs={Link} className={className}>
      <CardHeader>
        <CardTitle>{item.title}</CardTitle>
      </CardHeader>
      <CardBody>
        <p>{item.description}</p>
      </CardBody>
    </LinkCard>
  );
}
