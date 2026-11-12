import { LinkButton } from '@/components/static/LinkButton';
import { safeLinkHref } from '@/components/server/RichContent/safeUrl';
import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';
import type { ExternalLink, InternalLink } from '@msb/cms-sdk';
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
   * Internal-link actions, already rendered: `InternalActionsView` for REST
   * pages, `InternalActionsList` for Keystone GraphQL pages.
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

/**
 * The REST internal-link actions that can be shown. Links whose target is
 * missing or unpublished are left out. The CMS doesn't sanitize links on
 * save, so an unsafe URL (like `javascript:`) is left out too.
 */
function toInternalActionLinks(actions?: InternalLink[] | null) {
  return (actions ?? []).flatMap((action) => {
    const href = safeLinkHref(action.target?.path ?? action.target?.url);
    if (!action.target || !href) return [];
    return [
      { id: action.id, href, label: action.label || action.target.title },
    ];
  });
}

/** True when `InternalActionsView` will render at least one link. */
export function hasInternalActions(actions?: InternalLink[] | null) {
  return toInternalActionLinks(actions).length > 0;
}

/** Renders REST internal-link actions for `PageActionsView`. */
export function InternalActionsView(props: {
  actions?: InternalLink[] | null;
}) {
  const links = toInternalActionLinks(props.actions);
  if (!links.length) return null;

  // Same button as the Keystone `ActionButton`, so both render alike.
  return (
    <ul className="flex flex-col gap-2">
      {links.map((link) => (
        <LinkButton
          key={link.id}
          href={link.href}
          className="margin-right-0 usa-link--external"
          target="_blank"
          size="md"
          block
          color="primary"
        >
          {link.label}
        </LinkButton>
      ))}
    </ul>
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
