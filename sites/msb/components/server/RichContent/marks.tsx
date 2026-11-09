import { referenceKey, type ContentReferences } from '@msb/cms-sdk';
import { ComponentProps } from 'react';
import { BrokenLink } from '@/components/static/BrokenLink';
import { Link } from '@/components/static/Link';
import { LinkButton } from '@/components/static/LinkButton';
import type { MarkMapping } from './render';
import { safeLinkHref } from './safeUrl';

type ButtonColor = ComponentProps<typeof LinkButton>['color'];

const BUTTON_COLORS = new Set<string>([
  'primary',
  'base',
  'success',
  'error',
  'warning',
]);

function buttonColor(color?: string | null): ButtonColor {
  return color && BUTTON_COLORS.has(color) ? (color as ButtonColor) : undefined;
}

export function createMarkMapping(context: {
  references: ContentReferences;
}): MarkMapping {
  return {
    bold: ({ children }) => <strong>{children}</strong>,
    italic: ({ children }) => <em>{children}</em>,
    strike: ({ children }) => <s>{children}</s>,
    underline: ({ children }) => <u>{children}</u>,
    code: ({ children }) => <code>{children}</code>,
    subscript: ({ children }) => <sub>{children}</sub>,
    superscript: ({ children }) => <sup>{children}</sup>,

    link: ({ mark, children }) => {
      const href = safeLinkHref(mark.attrs?.href);
      if (!href) return <>{children}</>;
      const isExternal = /^https?:/i.test(href);
      return (
        <a
          href={href}
          title={mark.attrs?.title ?? undefined}
          {...(isExternal
            ? { target: '_blank', rel: 'noopener noreferrer' }
            : {})}
        >
          {children}
        </a>
      );
    },

    // A link to another CMS record. The CMS resolves it in `references`.
    dynamicLink: ({ mark, children }) => {
      const { modelType, modelId, variant, color } = mark.attrs ?? {};
      const target =
        modelType && modelId
          ? context.references[referenceKey(modelType, modelId)]
          : null;
      const href = safeLinkHref(target?.path ?? target?.url);

      if (!href) return <BrokenLink>{children}</BrokenLink>;

      if (variant === 'button') {
        return (
          <LinkButton
            href={href}
            color={buttonColor(color)}
            className="not-prose inline-block"
          >
            {children}
          </LinkButton>
        );
      }

      return <Link href={href}>{children}</Link>;
    },
  };
}
