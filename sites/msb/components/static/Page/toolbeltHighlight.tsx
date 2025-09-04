import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';
import Link from 'next/link';
import { plural } from 'pluralize';
import slugify from 'voca/slugify';

const toolbeltHighlightFragment = gql(`
  fragment ToolbeltHighlight on featuredItem {
    icon
    linkedItem {
      label      
      item {
        __typename
        ... on BasePageWithSlug {
          id
          slug
          title
        }

        ... on Url {
          id
          url
          title          
        }
      }
    }
  }
`);

export function ToolbeltHighlight(props: {
  data: FragmentType<typeof toolbeltHighlightFragment>;
}) {
  const item = getFragmentData(toolbeltHighlightFragment, props.data);

  function getUrl() {
    if (item.linkedItem?.item) {
      if (
        'url' in item.linkedItem.item &&
        typeof item.linkedItem.item.url === 'string'
      )
        return item.linkedItem.item.url;
      if ('slug' in item.linkedItem.item) {
        const typename = item.linkedItem.item.__typename;
        if (typename === 'OrgUnit') {
          return `/departments/${item.linkedItem.item.slug}`;
        }
        return `/${plural(slugify(typename))}/${item.linkedItem.item.slug}`;
      }
    }
    return '';
  }

  const url = getUrl();

  return (
    <Link
      href={url}
      className="group rounded-sm px-5 py-3 shadow-lg bg-white hover:bg-gray-100 text-base-darkest font-bold w-full no-underline"
    >
      <div className="flex flex-col items-center">
        <span
          className={`iconify size-9 ${item.icon} text-primary transition-colors group-hover:text-primary-dark`}
        ></span>
        <span>{item.linkedItem?.label || item.linkedItem?.item?.title}</span>
      </div>
    </Link>
  );
}
