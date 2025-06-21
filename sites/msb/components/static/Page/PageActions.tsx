import type {
  ActionFieldsFragmentDoc,
  LinkedItemUnion,
  Maybe,
} from '@msb/js-sdk/graphql';
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

export function PageActions(props: {
  primaryAction?: FragmentType<typeof ExternalActionFields> | null;
  secondaryActions?: FragmentType<typeof ExternalActionFields>[] | null;
  actions?: FragmentType<typeof ActionFieldsFragmentDoc>[] | null;
}) {
  const primary = props.primaryAction
    ? getFragmentData(ExternalActionFields, props.primaryAction)
    : null;

  const secondaryActions = props.secondaryActions
    ? props.secondaryActions.map((action) =>
        getFragmentData(ExternalActionFields, action),
      )
    : null;

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
      {!!props.actions && (
        <ul className="flex flex-col gap-2">
          {props.actions.map((action) => (
            <ActionButton action={action} />
          ))}
        </ul>
      )}
    </>
  );
}
