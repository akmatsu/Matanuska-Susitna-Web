import { LinkCard, CardHeader, CardTitle, CardBody } from '@matsugov/ui';
import Link from 'next/link';

export function LinkCardGrid({
  items,
  listKey,
}: {
  items: {
    slug: string;
    id: string;
    title: string;
    description?: string | null;
    [key: string]: any;
  }[];
  listKey: string;
}) {
  return (
    <ul className="grid grid-cols-2 gap-4">
      {items.map((item) => (
        <LinkCard
          as="li"
          linkAs={Link}
          href={`/${listKey}/${item.slug}`}
          className="h-full col-span-2 sm:col-span-1"
          key={item.id}
        >
          <CardHeader>
            <CardTitle>{item.title}</CardTitle>
          </CardHeader>
          <CardBody>
            <p className="truncate">{item.description}</p>
          </CardBody>
        </LinkCard>
      ))}
    </ul>
  );
}
