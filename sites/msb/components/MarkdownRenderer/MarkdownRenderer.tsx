import Link from 'next/link';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkDirective from 'remark-directive';
import { Process, Step } from './components';
import remarkDirectiveRehype from 'remark-directive-rehype';
import { ReactNode } from 'react';

declare global {
  namespace JSX {
    // this merges with the existing intrinsic elements, adding 'my-custom-tag' and its props
    interface IntrinsicElements {
      process: { children: ReactNode };
      step: { children: ReactNode };
    }
  }
}

export function MarkdownRenderer(props: { children: string }) {
  return (
    <Markdown
      remarkPlugins={[remarkGfm, remarkDirective, remarkDirectiveRehype]}
      components={{
        a: (props) => {
          const isExternal = props.href?.startsWith('http');
          return (
            <Link
              href={props.href as string}
              className={`usa-link ${isExternal ? 'usa-link--external' : ''}`}
              target={isExternal ? '_blank' : '_self'}
              referrerPolicy={
                isExternal ? 'no-referrer' : 'strict-origin-when-cross-origin'
              }
            >
              {props.children}
            </Link>
          );
        },
        process: Process,
        step: Step,
      }}
    >
      {props.children}
    </Markdown>
  );
}
