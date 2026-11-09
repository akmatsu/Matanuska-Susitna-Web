import type { CmsResponse } from './core/client';

/*
 * TipTap rich text types.
 *
 * The OpenAPI spec only describes a generic node ({ type, attrs?, content? }),
 * so the per-node types are written by hand here. They cover what both CMSes
 * write today:
 * - the Laravel CMS editor (Filament RichEditor in JSON mode), and
 * - Keystone's markdown-to-TipTap converter.
 *
 * Every attr is optional and nullable, and some accept a string or a number,
 * because the two CMSes do not write identical JSON. For example, Keystone
 * writes iframe width as "600" while the Laravel editor may write 600.
 */

type TextAlign = 'left' | 'center' | 'right' | 'justify' | 'start' | 'end';
type Size = string | number | null;

// An interface (not a type alias) holds the recursive `content` field, so
// TypeScript resolves it lazily instead of reporting a circular type.
interface NodeChildren {
  content?: TipTapNode[];
  marks?: TipTapMark[];
}

type Block<T extends string, A = Record<string, unknown>> = NodeChildren & {
  type: T;
  attrs?: A;
};

export type TipTapText = { type: 'text'; text: string; marks?: TipTapMark[] };

export type TipTapNode =
  | TipTapText
  | Block<'paragraph', { textAlign?: TextAlign | null }>
  | Block<'heading', { level?: number | null; textAlign?: TextAlign | null }>
  | Block<'bulletList'>
  | Block<'orderedList', { start?: number | null; type?: string | null }>
  | Block<'listItem'>
  | Block<'blockquote'>
  | Block<'horizontalRule'>
  | Block<'hardBreak'>
  | Block<'codeBlock', { language?: string | null }>
  | Block<'table'>
  | Block<'tableRow'>
  | Block<'tableHeader', TableCellAttrs>
  | Block<'tableCell', TableCellAttrs>
  | Block<
      'image',
      {
        src?: string | null;
        alt?: string | null;
        title?: string | null;
        width?: Size;
        height?: Size;
        /** Storage path of an image uploaded in the Laravel CMS. */
        id?: string | null;
      }
    >
  | Block<'calloutBlock', { color?: string | null }>
  | Block<'columnWrapper', { count?: number | string | null }>
  | Block<'column'>
  | Block<'stepList', { order?: number | null; spread?: boolean | null }>
  | Block<'step', { label?: string | null; listType?: string | null }>
  | Block<
      'docCollection',
      { collectionId?: string | null; collectionTitle?: string | null }
    >
  | Block<
      'iframe',
      {
        src?: string | null;
        title?: string | null;
        width?: Size;
        height?: Size;
        allow?: string | null;
        allowfullscreen?: boolean | string | null;
      }
    >;

type TableCellAttrs = {
  colspan?: number | null;
  rowspan?: number | null;
  colwidth?: number[] | null;
  align?: string | null;
};

type Mark<T extends string, A = Record<string, unknown>> = {
  type: T;
  attrs?: A;
};

export type TipTapMark =
  | Mark<'bold'>
  | Mark<'italic'>
  | Mark<'strike'>
  | Mark<'underline'>
  | Mark<'code'>
  | Mark<'subscript'>
  | Mark<'superscript'>
  | Mark<
      'link',
      {
        href?: string | null;
        target?: string | null;
        rel?: string | null;
        title?: string | null;
      }
    >
  | Mark<
      'dynamicLink',
      {
        /** lowerCamel from Laravel ("orgUnit"), PascalCase from Keystone ("OrgUnit"). */
        modelType?: string | null;
        modelId?: string | null;
        variant?: 'link' | 'button' | null;
        color?: string | null;
      }
    >;

export type TipTapDoc = { type: 'doc'; content?: TipTapNode[] };

export type TipTapNodeType = TipTapNode['type'];
export type TipTapMarkType = TipTapMark['type'];

type ServiceDetailResponse = CmsResponse<'/services/{slug}'>;

/** A record that a `dynamicLink` mark points to, resolved by the CMS. */
export type ContentReference = NonNullable<
  ServiceDetailResponse['references'][string]
>;

/** Map of `referenceKey()` to reference. `null` means missing or unpublished. */
export type ContentReferences = ServiceDetailResponse['references'];

/** Map of collection id to collection. `null` means it doesn't exist. */
export type ContentDocumentCollections =
  ServiceDetailResponse['documentCollections'];

/**
 * Keystone writes PascalCase model types and the Laravel CMS writes
 * lowerCamel. The CMS keys `references` by the lowerCamel form.
 */
export function normalizeModelType(modelType: string) {
  return modelType.charAt(0).toLowerCase() + modelType.slice(1);
}

/** The key the CMS uses in `references` for a dynamicLink target. */
export function referenceKey(modelType: string, modelId: string) {
  return `${normalizeModelType(modelType)}:${modelId}`;
}
