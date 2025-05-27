import { LinkCard, CardHeader, CardTitle, CardBody } from '@matsugov/ui/Card';
import Link from 'next/link';

export function LinkCardGrid<
  T extends {
    slug?: string | null;
    id?: string | null;
    title?: string | null;
    description?: string | null;
  },
>({ items, listKey }: { items?: (T | undefined | null)[]; listKey: string }) {
  return (
    <ul className="grid grid-cols-2 gap-4">
      {items?.map((item) => (
        <LinkCard
          as="li"
          linkAs={Link}
          href={`/${listKey}/${item?.slug}`}
          className="h-full col-span-2 sm:col-span-1"
          key={item?.id}
        >
          <CardHeader>
            <CardTitle>{item?.title}</CardTitle>
          </CardHeader>
          <CardBody>
            <p className="truncate">{item?.description}</p>
          </CardBody>
        </LinkCard>
      ))}
    </ul>
  );
}
