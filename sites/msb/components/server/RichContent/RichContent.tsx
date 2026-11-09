import type {
  ContentDocumentCollections,
  ContentReferences,
  TipTapDoc,
} from '@msb/cms-sdk';
import { createMarkMapping } from './marks';
import { createNodeMapping } from './nodes';
import { renderTipTap } from './render';

/** True when the document has something to render. */
export function hasRichContent(doc?: TipTapDoc | null): doc is TipTapDoc {
  return !!doc?.content?.length;
}

/**
 * Renders CMS rich text (TipTap JSON). This is the single place the site
 * renders TipTap content, so the rendering approach can change in one spot.
 *
 * Only node and mark types in the mappings are rendered as themselves:
 * - An unknown node is replaced by its children, so its text isn't lost.
 * - An unknown mark is dropped, and its text is kept.
 * Neither ever reaches the page as raw HTML.
 */
export function RichContent(props: {
  doc?: TipTapDoc | null;
  references?: ContentReferences;
  documentCollections?: ContentDocumentCollections;
}) {
  if (!hasRichContent(props.doc)) return null;

  return renderTipTap(props.doc, {
    nodes: createNodeMapping({
      documentCollections: props.documentCollections ?? {},
    }),
    marks: createMarkMapping({ references: props.references ?? {} }),
    unhandledNode: ({ node, children }) => {
      console.warn(`RichContent: unsupported node type "${String(node.type)}"`);
      return <>{children}</>;
    },
    unhandledMark: ({ mark, children }) => {
      console.warn(`RichContent: unsupported mark type "${String(mark.type)}"`);
      return <>{children}</>;
    },
  });
}
