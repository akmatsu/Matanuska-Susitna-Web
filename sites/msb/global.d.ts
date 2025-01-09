import { ReactNode, ComponentProps } from 'react';
import { Process, Step } from './components/MarkdownRenderer/components';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      process: ComponentProps<typeof Process>;
      step: ComponentProps<typeof Step>;
      'doc-collection': { id: string };
      'primary-action-button': { label: string };
    }
  }
}
