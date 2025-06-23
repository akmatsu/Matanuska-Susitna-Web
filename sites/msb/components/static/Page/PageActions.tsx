import type { LinkedItemUnion, Maybe } from '@msb/js-sdk/graphql';
import { LinkButton } from '@/components/static/LinkButton';
import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';
import { ActionButton } from './ActionButton';

const ExternalActionFields = gql(`
  fragment ExternalActionFields on ExternalLink {
    id
    label
    url {
      id
      title
      url
    }
  }
`);

const actionListFragment = gql(`
  fragment ActionList on InternalLink {
    id
    ...ActionFields
  }
`);

export function PageActions(props: {
  primaryAction?: FragmentType<typeof ExternalActionFields> | null;
  secondaryActions?: FragmentType<typeof ExternalActionFields>[] | null;
  actions?: FragmentType<typeof actionListFragment>[] | null;
}) {
  const primary = getFragmentData(ExternalActionFields, props.primaryAction);
  const secondaryActions = getFragmentData(
    ExternalActionFields,
    props.secondaryActions,
  );

  const actions = getFragmentData(actionListFragment, props.actions);

  return (
    <>
      {!!primary && primary?.url?.url && (
        <LinkButton
          href={primary.url.url}
          className="margin-right-0 usa-link--external"
          target="_blank"
          big
          block
        >
          {primary.label || primary.url.title}
        </LinkButton>
      )}
      {!!secondaryActions && (
        <ul className="flex flex-col gap-2">
          {secondaryActions.map((action) => (
            <>
              {action?.url?.url && (
                <LinkButton
                  key={action.url.id}
                  href={action.url.url}
                  className="margin-right-0 usa-link--external"
                  target="_blank"
                  big
                  block
                >
                  {action.label || action?.url?.title}
                </LinkButton>
              )}
            </>
          ))}
        </ul>
      )}
      {!!actions && (
        <ul className="flex flex-col gap-2">
          {actions.map((action) => (
            <ActionButton action={action} />
          ))}
        </ul>
      )}
    </>
  );
}
