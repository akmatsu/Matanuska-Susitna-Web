import { LinkButton } from './LinkButton';
import { ExternalLink } from '@msb/js-sdk';

export function PageActions({
  primaryAction,
  actions,
}: {
  primaryAction?: ExternalLink | null;
  actions?: ExternalLink[] | null;
}) {
  return (
    <>
      {primaryAction && (
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
      {actions && (
        <ul className="flex flex-col gap-2">
          {actions.map((action) => (
            <LinkButton
              key={action.id}
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
    </>
  );
}
