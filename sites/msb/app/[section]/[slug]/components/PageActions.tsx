import { LinkButton } from '../../../../components/LinkButton';
import { ExternalLink, LinkedItem } from '@msb/js-sdk';

export function PageActions({
  primaryAction,
  secondaryActions,
  actions,
}: {
  primaryAction?: ExternalLink | null;
  secondaryActions?: ExternalLink[] | null;
  actions?: LinkedItem[] | null;
}) {
  return (
    <>
      {!!primaryAction && (
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
            <LinkButton
              key={action.url.id}
              href={action.url.url}
              className="margin-right-0 usa-link--external"
              target="_blank"
              big
              block
            >
              {action.label || action.url.title}
            </LinkButton>
          ))}
        </ul>
      )}
      {!!actions && (
        <ul className="flex flex-col gap-2">
          {actions.map((action) => (
            <LinkButton
              key={action.item?.id}
              href={action.item?.url || ''}
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
