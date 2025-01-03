import Link from 'next/link';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkDirective from 'remark-directive';
import { Process, Step, DocCollectionWrapper } from './components';
import remarkDirectiveRehype from 'remark-directive-rehype';
import { ReactNode } from 'react';
import { ActionButtonWrapper } from './components/PrimaryActionButton';

declare global {
  namespace JSX {
    // this merges with the existing intrinsic elements, adding 'my-custom-tag' and its props
    interface IntrinsicElements {
      process: { children: ReactNode };
      step: { children: ReactNode };
      'doc-collection': { id: string };
      'primary-action-button': { label: string };
    }
  }
}

export function MarkdownRenderer(props: {
  title?: string;
  children: string;
  noProse?: boolean;
}) {
  return (
    <div
      className={
        props.noProse
          ? ''
          : 'prose prose-table:table-auto prose-table:w-full prose-th:bg-base-lighter prose-th:border prose-th:border-base-darkest prose-th:font-bold prose-th:px-2 prose-td:px-2 prose-td:border prose-td:border-base-darkest prose-table:border prose-table:border-base-darkest prose-a:text-primary'
      }
    >
      <h1>{props.title}</h1>
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
          'doc-collection': DocCollectionWrapper,
          'primary-action-button': ActionButtonWrapper,
        }}
      >
        {props.children}
      </Markdown>
    </div>
  );
}
