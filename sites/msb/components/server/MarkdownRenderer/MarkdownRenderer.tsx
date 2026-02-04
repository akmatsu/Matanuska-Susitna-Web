import Link from 'next/link';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkDirective from 'remark-directive';
import { Process, Step, DocCollectionWrapper } from './components';
import remarkDirectiveRehype from 'remark-directive-rehype';
import { ActionButtonWrapper } from './components/PrimaryActionButton';
import { InternalLink } from './components/InternalLink';
import { AnchorHTMLAttributes, ImgHTMLAttributes } from 'react';
import { visit } from 'unist-util-visit';
import { MDIframe } from './components/MdIframe';
import { MdCallout } from './components/Callout';
import clsx from 'clsx';

/**
 * Remark plugin to filter out unsupported directives.
 * It replaces unsupported directives with their literal syntax.
 */
function remarkFilterUnsupportedDirectives(allowed: string[]) {
  return () => (tree: any) => {
    visit(
      tree,
      ['textDirective', 'leafDirective', 'containerDirective'],
      (node, index, parent) => {
        if (!allowed.includes(node.name)) {
          const raw =
            node.type === 'textDirective'
              ? `:${node.name}`
              : `:${node.name}{${Object.entries(node.attributes || {})
                  .map(([k, v]) => `${k}="${v}"`)
                  .join(' ')}}`;

          parent!.children.splice(index!, 1, {
            type: 'text',
            value: raw,
          });
        }
      },
    );
  };
}

export function MarkdownRenderer(props: { children?: string | null }) {
  const allowedDirectives = [
    'process',
    'step',
    'doc-collection',
    'primary-action-button',
    'internal-link',
    'iframe',
    'calloutBlock',
    'columns',
    'column',
    'textAlign',
  ];

  return (
    <Markdown
      remarkPlugins={[
        remarkGfm,
        remarkDirective,
        remarkFilterUnsupportedDirectives(allowedDirectives),
        remarkDirectiveRehype,
      ]}
      components={{
        a: (props: AnchorHTMLAttributes<HTMLAnchorElement>) => {
          const isExternal = props.href?.startsWith('http');
          const isEmail = props.href?.startsWith('mailto:');

          if (!isEmail)
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
          else return props.children;
        },
        process: Process,
        step: Step,
        img: (props: ImgHTMLAttributes<HTMLImageElement>) => {
          return (
            <div className="w-full my-8">
              <img {...props} className="w-full mb-0 mt-0"></img>
              <div className="flex justify-center">
                <span className="text-base text-center">{props.title}</span>
              </div>
            </div>
          );
        },
        'doc-collection': DocCollectionWrapper,
        'primary-action-button': ActionButtonWrapper,
        'internal-link': InternalLink,
        iframe: MDIframe,
        calloutblock: MdCallout,
        columns: (props) => {
          return (
            <div
              className={clsx('md:grid md:gap-6', {
                'md:grid-cols-2': props.count === '2',
                'md:grid-cols-3': props.count === '3',
              })}
            >
              {props.children}
            </div>
          );
        },
        column: (props) => {
          return <div className="md:col-span-1">{props.children}</div>;
        },
        textalign: (props) => {
          return (
            <div
              className={clsx({
                'text-left': props.align === 'left',
                'text-center': props.align === 'center',
                'text-right': props.align === 'right',
              })}
            >
              {props.children}
            </div>
          );
        },
      }}
    >
      {props.children?.replace(/<br\s*\/?>/gi, '')}
    </Markdown>
  );
}
