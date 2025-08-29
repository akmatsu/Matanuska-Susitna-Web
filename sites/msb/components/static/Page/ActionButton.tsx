import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';
import { LinkButton } from '../LinkButton';
import { LinkedItemUnion, Maybe } from '@msb/js-sdk/graphql';
import { ButtonProps } from '@matsugov/ui';

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
  block = true,
  target = '_blank',
  blockOnMobile,
  size = 'lg',
  ...props
}: {
  action: FragmentType<typeof ActionFields>;
  className?: string;
  block?: boolean;
  size?: ButtonProps['size'];
  target?: string;
  blockOnMobile?: boolean;
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
      size={size}
      block={block}
      blockOnMobile={blockOnMobile}
      color="primary"
    >
      {action.label || action.item?.title}
    </LinkButton>
  );
}
