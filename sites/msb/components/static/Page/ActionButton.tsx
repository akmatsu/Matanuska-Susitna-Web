import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';
import { LinkButton } from '../LinkButton';
import { ButtonProps } from '@matsugov/ui';
import { getRedirectUrl } from '@/utils/stringHelpers';

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

      ... on BasePage {
        id
        title
        description
      }

      ... on ElectionsPage {
        id
        title
        description
      }

      ... on HomePage {
        id
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

  const url = getRedirectUrl(action.item);
  if (!url) return null;

  return (
    <LinkButton
      key={action.item?.id}
      href={url}
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
