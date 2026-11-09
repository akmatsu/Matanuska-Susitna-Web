import { LinkButton } from '@/components/static/LinkButton';
import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';
import type { ExternalLink } from '@msb/cms-sdk';
import { ReactNode } from 'react';
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

export type ExternalActionData = Pick<
  ExternalLink,
  'id' | 'label' | 'url' | 'title'
>;

export function PageActionsView(props: {
  primaryAction?: ExternalActionData | null;
  secondaryActions?: ExternalActionData[] | null;
  /**
   * Internal-link actions. Only Keystone GraphQL pages have these today, so
   * they are passed in already rendered.
   */
  actionsSlot?: ReactNode;
}) {
  const { primaryAction: primary, secondaryActions } = props;

  return (
    <>
      <ul className="flex flex-col gap-2">
        {!!primary && primary.url && (
          <LinkButton href={primary.url} target="_blank" color="primary" block>
            {primary.label || primary.title}
          </LinkButton>
        )}
        {!!secondaryActions &&
          secondaryActions.map((action) => (
            <div key={action.id} className="w-full">
              {action.url && (
                <LinkButton
                  href={action.url}
                  target="_blank"
                  color="primary"
                  block
                >
                  {action.label || action.title}
                </LinkButton>
              )}
            </div>
          ))}

        {props.actionsSlot}
      </ul>
    </>
  );
}

type ExternalActionRef = FragmentType<typeof ExternalActionFields>;
type ActionListRef = FragmentType<typeof actionListFragment>;

/** Maps the Keystone GraphQL external link fragment to view data. */
export function toExternalActionData(
  ref: ExternalActionRef,
): ExternalActionData {
  const action = getFragmentData(ExternalActionFields, ref);
  return {
    id: action.id,
    label: action.label ?? '',
    url: action.url?.url ?? null,
    title: action.url?.title ?? null,
  };
}

/** Renders Keystone internal-link actions for `PageActionsView`. */
export function InternalActionsList(props: {
  actions?: ActionListRef[] | null;
}) {
  const actions = getFragmentData(actionListFragment, props.actions);
  if (!actions) return null;

  return (
    <ul className="flex flex-col gap-2">
      {actions.map((action) => (
        <ActionButton action={action} key={action.id} block />
      ))}
    </ul>
  );
}

export function PageActions(props: {
  primaryAction?: ExternalActionRef | null;
  secondaryActions?: ExternalActionRef[] | null;
  actions?: ActionListRef[] | null;
}) {
  return (
    <PageActionsView
      primaryAction={
        props.primaryAction ? toExternalActionData(props.primaryAction) : null
      }
      secondaryActions={props.secondaryActions?.map(toExternalActionData)}
      actionsSlot={<InternalActionsList actions={props.actions} />}
    />
  );
}
