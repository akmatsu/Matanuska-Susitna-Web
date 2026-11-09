import { Callout } from '@matsugov/ui';
import { ProcessList, ProcessListItem } from '@matsugov/ui/ProcessList';
import type { ContentDocumentCollections, TipTapNode } from '@msb/cms-sdk';
import clsx from 'clsx';
import { Children, ComponentProps, ReactNode } from 'react';
import { DocCollectionView } from '@/components/client/DocCollectionView';
import { MdImage } from '../MarkdownRenderer/components/MdImage';
import type { AnyTipTapNode, NodeMapping } from './render';
import {
  safeIframeAllow,
  safeIframeSrc,
  safeImageSrc,
  safeSize,
} from './safeUrl';

const TEXT_ALIGN_CLASSES: Record<string, string> = {
  left: 'text-left',
  start: 'text-start',
  center: 'text-center',
  right: 'text-right',
  end: 'text-end',
  justify: 'text-justify',
};

function alignClass(align?: string | null) {
  return align ? TEXT_ALIGN_CLASSES[align] : undefined;
}

/**
 * TipTap wraps the text of list items and table cells in a paragraph.
 * Markdown didn't, and the prose styles add margins to those paragraphs,
 * so the paragraph is dropped there to keep the old look.
 */
function isUnwrappedParagraph(parent?: AnyTipTapNode) {
  return (
    parent?.type === 'listItem' ||
    parent?.type === 'tableCell' ||
    parent?.type === 'tableHeader'
  );
}

/** Plain text of a node, e.g. a step's title paragraph. */
function textOf(node?: TipTapNode): string {
  if (!node) return '';
  if (node.type === 'text') return node.text;
  return (node.content ?? []).map(textOf).join('');
}

function childArray(children: ReactNode) {
  return Children.toArray(children);
}

type CalloutColor = ComponentProps<typeof Callout>['color'];

/** Keystone writes "base", the Laravel editor writes "default" and "danger". */
function calloutColor(color?: string | null): CalloutColor {
  switch (color) {
    case 'info':
    case 'success':
    case 'warning':
    case 'error':
      return color;
    case 'danger':
      return 'error';
    default:
      return 'base';
  }
}

/** Keystone stores a markdown image's size ratio as a height like "150%". */
function imageSizePercent(height: unknown) {
  if (typeof height === 'string' && height.trim().endsWith('%')) {
    const value = parseFloat(height);
    if (Number.isFinite(value) && value > 0) return value;
  }
  return 100;
}

/** Older markdown stored the size ratio in alt, so numeric alts aren't real alt text. */
function imageAlt(alt?: string | null, title?: string | null) {
  if (alt && !/^\d+(\.\d+)?$/.test(alt.trim())) return alt;
  return title || 'Image';
}

export function createNodeMapping(context: {
  documentCollections: ContentDocumentCollections;
}): NodeMapping {
  return {
    doc: ({ children }) => <>{children}</>,
    text: ({ node }) => node.text,

    paragraph: ({ node, parent, children }) =>
      isUnwrappedParagraph(parent) ? (
        <>{children}</>
      ) : (
        <p className={alignClass(node.attrs?.textAlign)}>{children}</p>
      ),

    heading: ({ node, children }) => {
      const level = Math.min(Math.max(Number(node.attrs?.level) || 2, 1), 6);
      const Tag = `h${level}` as 'h1';
      return (
        <Tag className={alignClass(node.attrs?.textAlign)}>{children}</Tag>
      );
    },

    bulletList: ({ children }) => <ul>{children}</ul>,
    orderedList: ({ node, children }) => (
      <ol start={node.attrs?.start ?? undefined}>{children}</ol>
    ),
    listItem: ({ children }) => <li>{children}</li>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
    horizontalRule: () => <hr />,
    hardBreak: () => <br />,
    codeBlock: ({ node, children }) => (
      <pre>
        <code
          className={
            node.attrs?.language
              ? `language-${node.attrs.language.replace(/[^\w-]/g, '')}`
              : undefined
          }
        >
          {children}
        </code>
      </pre>
    ),

    table: ({ node, children }) => {
      // Put a first row made only of header cells in <thead>, like markdown tables.
      const firstRow = node.content?.[0];
      const hasHeaderRow =
        firstRow?.type === 'tableRow' &&
        !!firstRow.content?.length &&
        firstRow.content.every((cell) => cell.type === 'tableHeader');
      const rows = childArray(children);
      return (
        <table>
          {hasHeaderRow && <thead>{rows[0]}</thead>}
          <tbody>{hasHeaderRow ? rows.slice(1) : rows}</tbody>
        </table>
      );
    },
    tableRow: ({ children }) => <tr>{children}</tr>,
    tableHeader: ({ node, children }) => (
      <th
        colSpan={node.attrs?.colspan ?? undefined}
        rowSpan={node.attrs?.rowspan ?? undefined}
      >
        {children}
      </th>
    ),
    tableCell: ({ node, children }) => (
      <td
        colSpan={node.attrs?.colspan ?? undefined}
        rowSpan={node.attrs?.rowspan ?? undefined}
      >
        {children}
      </td>
    ),

    image: ({ node }) => {
      const src = safeImageSrc(node.attrs?.src);
      if (!src) return null;
      const title = node.attrs?.title;
      // Same markup as markdown images in MarkdownRenderer.
      return (
        <span className="my-8 block w-full">
          <MdImage
            src={src}
            title={title ?? undefined}
            imgSize={imageSizePercent(node.attrs?.height)}
            alt={imageAlt(node.attrs?.alt, title)}
          />
          <span className="mx-auto flex max-w-lg justify-center text-sm">
            <span className="text-msb-base text-center">{title}</span>
          </span>
        </span>
      );
    },

    calloutBlock: ({ node, children }) => (
      <Callout color={calloutColor(node.attrs?.color)}>{children}</Callout>
    ),

    columnWrapper: ({ node, children }) => {
      const count = String(node.attrs?.count ?? 2);
      return (
        <div
          className={clsx('block md:grid md:gap-6', {
            'md:grid-cols-2': count !== '3',
            'md:grid-cols-3': count === '3',
          })}
        >
          {children}
        </div>
      );
    },
    column: ({ children }) => (
      <div className="block md:col-span-1">{children}</div>
    ),

    stepList: ({ children }) => <ProcessList>{children}</ProcessList>,
    step: ({ node, children }) => {
      // The step's first paragraph is its title, like in the editor.
      const [first] = node.content ?? [];
      const hasTitle = first?.type === 'paragraph';
      const title = (hasTitle && textOf(first)) || 'Step';
      const body = childArray(children);
      return (
        <ProcessListItem title={title}>
          {hasTitle ? body.slice(1) : body}
        </ProcessListItem>
      );
    },

    docCollection: ({ node }) => {
      const id = node.attrs?.collectionId;
      const collection = id ? context.documentCollections[id] : null;
      if (!collection) return null;
      return (
        <DocCollectionView
          title={collection.title || node.attrs?.collectionTitle}
          documents={collection.documents}
        />
      );
    },

    iframe: ({ node }) => {
      const src = safeIframeSrc(node.attrs?.src);
      if (!src) return null;
      const fullscreen = node.attrs?.allowfullscreen;
      return (
        <iframe
          src={src}
          title={node.attrs?.title || 'Embedded content'}
          width={safeSize(node.attrs?.width)}
          height={safeSize(node.attrs?.height)}
          allow={safeIframeAllow(node.attrs?.allow)}
          allowFullScreen={fullscreen !== false && fullscreen !== 'false'}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      );
    },
  };
}
