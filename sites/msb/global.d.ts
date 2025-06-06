import { ReactNode, ComponentProps } from 'react';
import { Process, Step } from './components/server/MarkdownRenderer/components';
import { InternalLink } from './components/server/MarkdownRenderer/components/InternalLink';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      process: ComponentProps<typeof Process>;
      step: ComponentProps<typeof Step>;
      'doc-collection': { id: string };
      'primary-action-button': { label: string };
      'internal-link': ComponentProps<typeof InternalLink>;
    }
  }
}
