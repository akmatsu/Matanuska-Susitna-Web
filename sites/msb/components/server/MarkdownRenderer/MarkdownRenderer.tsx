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
          return <span>{props.children}</span>;
        },
        process: Process,
        step: Step,
        img: (props: ImgHTMLAttributes<HTMLImageElement>) => {
          return (
            <span className="my-8 block w-full">
              {/* TODO: change this to a Next <Image /> component */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                {...props}
                className="mt-0 mb-0 w-full"
                alt={props.alt || props.title || 'Image'}
              ></img>
              <span className="flex justify-center">
                <span className="text-center text-base">{props.title}</span>
              </span>
            </span>
          );
        },
        'doc-collection': DocCollectionWrapper,
        'primary-action-button': ActionButtonWrapper,
        'internal-link': InternalLink,
        iframe: MDIframe,
        calloutblock: MdCallout,
        columns: (props) => {
          return (
            <span
              className={clsx('block md:grid md:gap-6', {
                'md:grid-cols-2': props.count === '2',
                'md:grid-cols-3': props.count === '3',
              })}
            >
              {props.children}
            </span>
          );
        },
        column: (props) => {
          return <span className="block md:col-span-1">{props.children}</span>;
        },
        textalign: (props) => {
          return (
            <span
              className={clsx('block', {
                'text-left': props.align === 'left',
                'text-center': props.align === 'center',
                'text-right': props.align === 'right',
              })}
            >
              {props.children}
            </span>
          );
        },
      }}
    >
      {props.children?.replace(/<br\s*\/?>/gi, '')}
    </Markdown>
  );
}
