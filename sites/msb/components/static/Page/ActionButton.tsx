import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';
import { LinkButton } from '../LinkButton';
import { LinkedItemUnion, Maybe } from '@msb/js-sdk/graphql';

const ActionFields = gql(`
  fragment ActionFields on InternalLink {
    id
    label
    item {
      __typename
      ... on BasePageWithSlug {
        id
        slug
        title
        description
      }
      ... on Url {
        id
        url
        title
        description
      }
    }
  }
`);

export function ActionButton({
  className,
  big = true,
  block = true,
  target = '_blank',
  ...props
}: {
  action: FragmentType<typeof ActionFields>;
  className?: string;
  big?: boolean;
  block?: boolean;
  target?: string;
}) {
  const action = getFragmentData(ActionFields, props.action);

  function getUrlSection(str?: string) {
    if (!str) {
      return '/';
    }
    if (str === 'OrgUnit') {
      return '/departments/';
    }
    return `/${str.toLocaleLowerCase()}s/`;
  }

  function getUrl(item?: Maybe<LinkedItemUnion>) {
    if (!item) {
      return '';
    }

    return 'url' in item
      ? item.url!
      : 'slug' in item
        ? `${getUrlSection(item.__typename)}${item.slug}`
        : '';
  }

  return (
    <LinkButton
      key={action.item?.id}
      href={getUrl(action.item)}
      className={`margin-right-0 usa-link--external ${className}`}
      target={target}
      big={big}
      block={block}
    >
      {action.label || action.item?.title}
    </LinkButton>
  );
}
