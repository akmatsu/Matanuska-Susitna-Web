import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';
import { LinkButton } from '../LinkButton';
import { ComponentProps } from 'react';

const externalActionFragment = gql(`
  fragment ExternalActionButton on ExternalLink {
    label
    url {
      url
    }
  }
`);

export function ExternalActionButton({
  action: a,
  blockOnMobile,
  ...props
}: {
  action?: FragmentType<typeof externalActionFragment> | null;
  blockOnMobile?: boolean;
} & Omit<ComponentProps<typeof LinkButton>, 'href'>) {
  const action = getFragmentData(externalActionFragment, a);

  if (action?.url?.url)
    return (
      <LinkButton
        href={action.url.url}
        blockOnMobile={blockOnMobile}
        {...props}
      >
        {action.label}
      </LinkButton>
    );
}
