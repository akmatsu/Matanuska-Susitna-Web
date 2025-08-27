import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';
import { LinkButton } from '../LinkButton';

const externalActionFragment = gql(`
  fragment ExternalActionButton on ExternalLink {
    label
    url {
      url
    }
  }
`);

export function ExternalActionButton(props: {
  action?: FragmentType<typeof externalActionFragment> | null;
  blockOnMobile?: boolean;
}) {
  const action = getFragmentData(externalActionFragment, props.action);
  if (action?.url?.url)
    return (
      <LinkButton href={action.url.url} blockOnMobile={props.blockOnMobile}>
        {action.label}
      </LinkButton>
    );
}
