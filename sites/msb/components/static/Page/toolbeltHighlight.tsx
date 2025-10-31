import { getRedirectUrl } from '@/utils/stringHelpers';
import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';
import Link from 'next/link';

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

  const url = getRedirectUrl(item.linkedItem?.item);

  if (!url) return null;

  return (
    <Link
      href={url}
      className="group w-28 rounded p-2 shadow-lg bg-white hover:bg-gray-100 text-base-darkest font-bold no-underline flex flex-col items-center gap-2 text-center border border-base-lighter hover:border-base-light  border-b-4 border-b-primary hover:border-b-primary-dark"
    >
      <div className="size-14 bg-primary rounded-full aspect-square flex justify-center items-center group-hover:bg-primary-dark transition-colors">
        <span className={`iconify size-8 ${item.icon} text-white`}></span>
      </div>
      <span className="text-sm">{item.linkedItem?.label}</span>
    </Link>
  );
}
