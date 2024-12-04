import { PluginSpec } from '@milkdown/kit/prose/state';
import {
  ReactNodeViewUserOptions,
  ReactPluginViewUserOptions,
} from '@prosemirror-adapter/react';
import type { NodeViewConstructor } from '@milkdown/prose/view';

export type MdEditorProps = {
  /** String of markdown text */
  initialValue?: string;

  /** Called whenever the markdown content changes */
  onChange?: (value: string | null) => void;
  /**
   * Enables block editing features like drag and drop
   * @default true
   */
  block?: boolean;

  /**
   * Enables the slash menu
   * @default true
   */
  slash?: boolean;

  /**
   * Enables the selection toolbar.
   * @default true
   */
  toolbar?: boolean;

  /**
   * Enables the use of documentCollections
   * @default true
   */
  documentCollections?: boolean;
  /**
   * Enables the tooltip for editing links.
   * @default true
   */
  linkTooltip?: boolean;

  /**
   * Enables steps and processes blocks
   * @default true
   */
  steps?: boolean;

  /**
   * Enables primary action buttons
   * @default true
   */
  primaryActionButton?: boolean;

  /**
   * Enables tables in markdown
   * @default true
   */
  table?: boolean;

  /**
   * Enables lists in markdown
   */
  list?: boolean;
};

export type PluginViewFactoryFn = (
  options: ReactPluginViewUserOptions,
) => PluginSpec<any>['view'];

export type NodeViewFactoryFn = (
  options: ReactNodeViewUserOptions,
) => NodeViewConstructor;
