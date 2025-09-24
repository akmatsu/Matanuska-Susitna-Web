import { GetInternalLinkDataQuery } from '@msb/js-sdk/graphql';
import { Tooltip } from '@matsugov/ui/Tooltip';
import clsx from 'clsx';
import Link from 'next/link';
import { plural } from 'pluralize';
import v from 'voca';
import { gql } from '@msb/js-sdk/gql';
import { getClientHandler } from '@/utils/apollo/utils';
import { getRedirectUrl } from '@/utils/stringHelpers';

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

function getUrl(data: GetInternalLinkDataQuery, list?: string) {
  if (data.getInternalLink && list) {
    if ('slug' in data.getInternalLink) {
      return `/${v.slugify(plural(list))}/${data.getInternalLink.slug}`;
    }
    if ('url' in data.getInternalLink) {
      return data.getInternalLink.url;
    }
    if (data.getInternalLink.__typename === 'BoardPage') {
      return `/boards`;
    }
    if (data.getInternalLink.__typename === 'HomePage') {
      return '/';
    }
  }
  return undefined;
}

export async function InternalLink(props: {
  list?: string;
  itemID?: string;
  children: string;
}) {
  if (props.list && props.itemID) {
    const { data, errors, error } = await getClientHandler({
      query: getInternalLinkData,
      variables: {
        id: props.itemID,
        list: props.list,
      },
    });

    const url = getRedirectUrl(data.getInternalLink, props.list);

    const isExternalLink =
      !!url?.startsWith('http://') || !!url?.startsWith('https://');

    if (url && !errors?.length && !error)
      return (
        <Link
          href={url}
          target={isExternalLink ? '_blank' : undefined}
          referrerPolicy="no-referrer"
          className={clsx({
            'line-through !text-error': url === '/not-found',
          })}
        >
          {props.children}{' '}
          {isExternalLink && (
            <span className="icon-[mdi--external-link] -mb-0.5" />
          )}
        </Link>
      );
  }

  return (
    <Tooltip
      content="Oops! Looks like this link is broken. We are working on it!"
      className="text-center"
    >
      <span className="!text-error !line-through !cursor-not-allowed">
        {props.children} <span className="icon-[mdi--error] -mb-0.5" />
      </span>
    </Tooltip>
  );
}
