import { Tooltip } from '@matsugov/ui/Tooltip';
import clsx from 'clsx';

import { gql } from '@msb/js-sdk/gql';
import { getClientHandler } from '@/utils/apollo/utils';
import { getRedirectUrl } from '@/utils/stringHelpers';
import { Link } from '@/components/static/Link';
import { LinkButton } from '@/components/static/LinkButton';

const getInternalLinkData = gql(`
  query GetInternalLinkData($id: ID!, $list: String!) {
    getInternalLink(id: $id, type: $list) {
      ... on BasePageWithSlug {
        title
        slug
      }

      ... on BasePage {
        title
      }

      ... on Url {
        title
        url
      }

      ... on Document {
        title
        file {
          url
        }
      }
    }
  }
`);

export async function InternalLink(props: {
  list?: string;
  itemID?: string;
  children: string;
  node: {
    properties: {
      color?: string;
      style?: 'button';
    };
  };
}) {
  if (props.list && props.itemID) {
    const { data, error } = await getClientHandler({
      query: getInternalLinkData,
      variables: {
        id: props.itemID,
        list: props.list,
      },
    });

    const isButton = props.node?.properties.style === 'button';
    const Tag = isButton ? LinkButton : Link;

    // Filter the union type to only include types that getRedirectUrl can handle
    const internalLink = data?.getInternalLink;
    const supportedLink =
      internalLink &&
      ('url' in internalLink ||
        'slug' in internalLink ||
        'file' in internalLink ||
        (internalLink as any).__typename === 'HomePage' ||
        (internalLink as any).__typename === 'BoardPage' ||
        (internalLink as any).__typename === 'ElectionsPage')
        ? internalLink
        : null;

    const url = getRedirectUrl(supportedLink as any, props.list);

    if (url && !error)
      return (
        <Tag
          href={url}
          color={props.node?.properties.color as any}
          className={clsx({
            'text-error! line-through': url === '/not-found',
            'not-prose inline-block': isButton,
          })}
        >
          {props.children}
        </Tag>
      );
  }

  return (
    <Tooltip
      content="Oops! Looks like this link is broken. We are working on it!"
      className="text-center"
    >
      <span className="text-error! cursor-not-allowed! line-through!">
        {props.children} <span className="icon-[mdi--error] -mb-0.5" />
      </span>
    </Tooltip>
  );
}
