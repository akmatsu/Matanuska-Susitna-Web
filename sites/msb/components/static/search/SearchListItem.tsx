import { plural, singular } from 'pluralize';
import v from 'voca';
import { LinkIconCard } from '../LinkIconCard';

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
    item.url ||
    (formattedListKey === 'topics'
      ? `/${item.slug}`
      : `/${formattedListKey}/${item.slug}`);
  return (
    <li>
      <LinkIconCard
        href={url}
        title={item.title}
        subtitle={v.titleCase(singular(listKey)).replace(/[_-]/g, ' ')}
        icon={getIcon(item.type)}
        description={item.description}
        className={className}
      />
    </li>
  );
}

function getIcon(type?: string) {
  switch (type) {
    default:
      return 'icon-[mdi--image-description]';
    case 'assemblyDistrict':
      return 'icon-[mdi--home-city]';
    case 'assembly_district':
      return 'icon-[mdi--home-city]';
    case 'board':
      return 'icon-[mdi--user-group]';
    case 'community':
      return 'icon-[mdi--home-group]';
    case 'event':
      return 'icon-[mdi--event]';
    case 'facility':
      return 'icon-[mdi--office-building]';
    case 'department':
      return 'icon-[mdi--user-badge]';
    case 'orgUnit':
      return 'icon-[mdi--user-badge]';
    case 'park':
      return 'icon-[mdi--pine-tree]';
    case 'plan':
      return 'icon-[mdi--chart-line]';
    case 'publicNotice':
      return 'icon-[mdi--bullhorn]';
    case 'public-notice':
      return 'icon-[mdi--bullhorn]';
    case 'public_notice':
      return 'icon-[mdi--bullhorn]';
    case 'service':
      return 'icon-[mdi--help-outline]';
    case 'topic':
      return 'icon-[mdi--idea]';
    case 'trail':
      return 'icon-[mdi--hiking]';
    case 'office':
      return 'icon-[mdi--user-tie]';
  }
}
