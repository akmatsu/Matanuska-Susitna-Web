import type {
  ActionFieldsFragment,
  ExternalActionFieldsFragment,
  LinkedItemUnion,
  Maybe,
} from '@msb/js-sdk/graphql';
import { LinkButton } from '@/components/static/LinkButton';

export function PageActions({
  primaryAction,
  secondaryActions,
  actions,
}: {
  primaryAction?: ExternalActionFieldsFragment | null;
  secondaryActions?: ExternalActionFieldsFragment[] | null;
  actions?: ActionFieldsFragment[] | null;
}) {
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
      {!!primaryAction && primaryAction?.url?.url && (
        <LinkButton
          href={primaryAction.url.url}
          className="margin-right-0 usa-link--external"
          target="_blank"
          big
          block
        >
          {primaryAction.label || primaryAction.url.title}
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
            <LinkButton
              key={action.item?.id}
              href={getUrl(action.item)}
              className="margin-right-0 usa-link--external"
              target="_blank"
              big
              block
            >
              {action.label || action.item?.title}
            </LinkButton>
          ))}
        </ul>
      )}
    </>
  );
}
