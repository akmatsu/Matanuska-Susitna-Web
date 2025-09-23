import { ComponentProps } from 'react';
import { Process } from './components/server/MarkdownRenderer/components/Process';
import { InternalLink } from './components/server/MarkdownRenderer/components/InternalLink';
import { Step } from './components/server/MarkdownRenderer/components/Step';
import {
  MDIframe,
  MDIframeWrapper,
} from './components/server/MarkdownRenderer/components/MdIframe';

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
