import { toKebabCase } from '@/utils/stringHelpers';
import { LinkCard, CardHeader, CardBody, CardTitle } from '@matsugov/ui/Card';
import Link from 'next/link';
import { plural } from 'pluralize';
import v from 'voca';

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
    type?: string;
    [key: string]: any;
  };
  listKey: string;
  className?: string;
}) {
  const formattedListKey = plural(v.slugify(listKey));

  const url =
    item.url || formattedListKey === 'topics'
      ? `/${item.slug}`
      : `/${formattedListKey}/${item.slug}`;
  return (
    <LinkCard href={url} as="li" linkAs={Link} className={className}>
      <CardHeader>
        {item.type && (
          <p className="text-sm text-base-dark font-semibold">
            {v.titleCase(item.type).replace('_', ' ')}
          </p>
        )}
        <CardTitle>{item.title}</CardTitle>
      </CardHeader>

      <CardBody>
        <p>{item.description}</p>
      </CardBody>
    </LinkCard>
  );
}
