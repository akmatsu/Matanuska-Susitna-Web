import { getClient } from '@/utils/apollo/ApolloClient';
import { GET_INTERNAL_LINK_DATA } from '@msb/js-sdk/getInternalLinkData';
import { GetInternalLinkDataQuery } from '@msb/js-sdk/graphql';
import { Tooltip } from '@matsugov/ui/Tooltip';
import clsx from 'clsx';
import Link from 'next/link';
import { plural } from 'pluralize';
import v from 'voca';

function getUrl(data: GetInternalLinkDataQuery, list: string) {
  if (data.getInternalLink) {
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
  list: string;
  itemID: string;
  children: string;
}) {
  const { data } = await getClient().query({
    query: GET_INTERNAL_LINK_DATA,
    variables: {
      id: props.itemID,
      list: props.list,
    },
  });

  const url = getUrl(data, props.list);

  const isExternalLink =
    !!url?.startsWith('http://') || !!url?.startsWith('https://');

  if (url)
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
  else
    return (
      <Tooltip
        content="Oops! Looks like this link is broken. We are working on it!"
        className="text-center"
      >
        <span className="text-error line-through cursor-not-allowed">
          {props.children} <span className="icon-[mdi--error] -mb-0.5" />
        </span>
      </Tooltip>
    );
}
