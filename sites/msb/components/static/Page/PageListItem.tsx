import { getRedirectUrl } from '@/utils/stringHelpers';
import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';
import { ElementType } from 'react';
import { LinkIconCard } from '../LinkIconCard';

const pageItemFragment = gql(`
  fragment PageItem on BasePageWithSlug {
    __typename
    title
    slug
    description
  }
`);

export function PageListItem(props: {
  item: FragmentType<typeof pageItemFragment>;
  as?: ElementType;
}) {
  const item = getFragmentData(pageItemFragment, props.item);
  const url = getRedirectUrl(item);
  if (!url || !item) return null;

  const icon = getIcon(item.__typename);

  return (
    <li>
      <LinkIconCard
        href={url}
        icon={icon}
        description={item.description}
        title={item.title}
      />
    </li>
  );
}

function getIcon(type: string) {
  switch (type) {
    default:
      return 'icon-[mdi--image-description]';
    case 'AssemblyDistrict':
      return 'icon-[mdi--map-marker-account-outline]';
    case 'Board':
      return 'icon-[mdi--user-group]';
    case 'Community':
      return 'icon-[mdi--home-group]';
    case 'Event':
      return 'icon-[mdi--event]';
    case 'Facility':
      return 'icon-[mdi--office-building]';
    case 'OrgUnit':
      return 'icon-[mdi--user-badge]';
    case 'Park':
      return 'icon-[mdi--pine-tree]';
    case 'Plan':
      return 'icon-[mdi--chart-line]';
    case 'PublicNotice':
      return 'icon-[mdi--bullhorn]';
    case 'Service':
      return 'icon-[mdi--help-outline]';
    case 'Topic':
      return 'icon-[mdi--idea]';
    case 'Trail':
      return 'icon-[mdi--hiking]';
  }
}
