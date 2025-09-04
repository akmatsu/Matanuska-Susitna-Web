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

        ... on BasePage {
          id
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
      className="group w-28 rounded p-2 shadow-lg bg-white hover:bg-gray-100 text-base-darkest font-bold no-underline flex flex-col items-center gap-2 text-center  border-b-4 border-primary hover:border-primary-dark"
    >
      <div className="size-14 bg-surface-primary rounded-full aspect-square flex justify-center items-center">
        <span
          className={`iconify size-8 ${item.icon} text-secondary transition-colors group-hover:text-secondary-dark`}
        ></span>
      </div>
      <span className="text-sm">{item.linkedItem?.label}</span>
    </Link>
  );
}
