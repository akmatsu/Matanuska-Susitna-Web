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
      <ul className="flex flex-col gap-2">
        {!!primary && primary?.url?.url && (
          <LinkButton
            href={primary.url.url}
            target="_blank"
            color="primary"
            block
          >
            {primary.label || primary.url.title}
          </LinkButton>
        )}
        {!!secondaryActions &&
          secondaryActions.map((action) => (
            <div key={action.id} className="w-full">
              {action?.url?.url && (
                <LinkButton
                  key={action.url.id}
                  href={action.url.url}
                  target="_blank"
                  color="primary"
                  block
                >
                  {action.label || action?.url?.title}
                </LinkButton>
              )}
            </div>
          ))}

        {!!actions && (
          <ul className="flex flex-col gap-2">
            {actions.map((action) => (
              <ActionButton action={action} key={action.id} block />
            ))}
          </ul>
        )}
      </ul>
    </>
  );
}
