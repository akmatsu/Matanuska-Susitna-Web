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
      className="group text-msb-base-darkest border-msb-base-lighter hover:border-msb-base-light border-b-primary hover:border-b-primary-dark flex w-28 flex-col items-center gap-2 rounded border border-b-4 bg-white p-2 text-center font-bold no-underline shadow-lg hover:bg-gray-100"
    >
      <div className="bg-primary group-hover:bg-primary-dark flex aspect-square size-14 items-center justify-center rounded-full transition-colors">
        <span className={`iconify size-8 ${item.icon} text-white`}></span>
      </div>
      <span className="text-sm">{item.linkedItem?.label}</span>
    </Link>
  );
}
