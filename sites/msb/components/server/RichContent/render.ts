import { renderJSONContentToReactElement } from '@tiptap/static-renderer/json/react';
import type { NodeProps } from '@tiptap/static-renderer/json/react';
import type { TipTapDoc, TipTapMark, TipTapNode } from '@msb/cms-sdk';
import type { ReactNode } from 'react';

export type AnyTipTapNode = TipTapDoc | TipTapNode;

type NodeOf<K extends AnyTipTapNode['type']> = Extract<
  AnyTipTapNode,
  { type: K }
>;
type MarkOf<K extends TipTapMark['type']> = Extract<TipTapMark, { type: K }>;

export type NodeRendererProps<K extends AnyTipTapNode['type']> = {
  node: NodeOf<K>;
  parent?: AnyTipTapNode;
  /** The rendered child nodes, in order. */
  children?: ReactNode;
};

export type MarkRendererProps<K extends TipTapMark['type']> = {
  mark: MarkOf<K>;
  /** The text node the mark is on. */
  node: TipTapNode;
  children?: ReactNode;
};

/**
 * One renderer per known node type. A missing key is a compile error, and
 * each renderer gets its own node type, so its attrs are fully typed.
 */
export type NodeMapping = {
  [K in AnyTipTapNode['type']]: (props: NodeRendererProps<K>) => ReactNode;
};

export type MarkMapping = {
  [K in TipTapMark['type']]: (props: MarkRendererProps<K>) => ReactNode;
};

type LooseNodeRenderer = (
  props: NodeProps<AnyTipTapNode, ReactNode>,
) => ReactNode;
type LooseMarkRenderer = (props: {
  mark: TipTapMark;
  node: AnyTipTapNode;
  children?: ReactNode;
}) => ReactNode;

/**
 * Renders a TipTap document with @tiptap/static-renderer, using typed
 * mappings.
 *
 * The mapping tables are also the allowlist: a node or mark type that isn't
 * in them goes to `unhandledNode` / `unhandledMark`.
 */
export function renderTipTap(
  doc: TipTapDoc,
  options: {
    nodes: NodeMapping;
    marks: MarkMapping;
    unhandledNode: (props: {
      node: { type?: unknown };
      children?: ReactNode;
    }) => ReactNode;
    unhandledMark: (props: {
      mark: { type?: unknown };
      children?: ReactNode;
    }) => ReactNode;
  },
): ReactNode {
  const render = renderJSONContentToReactElement<TipTapMark, AnyTipTapNode>({
    // The package types each mapping as taking any node. This cast is safe
    // because the package picks the renderer by `node.type`, so the
    // `calloutBlock` renderer only ever receives calloutBlock nodes.
    nodeMapping: options.nodes as unknown as Record<string, LooseNodeRenderer>,
    markMapping: options.marks as unknown as Record<string, LooseMarkRenderer>,
    unhandledNode: options.unhandledNode as LooseNodeRenderer,
    unhandledMark: options.unhandledMark as LooseMarkRenderer,
  });
  return render({ content: doc });
}
