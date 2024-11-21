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

  block?: boolean;
  slash?: boolean;
  toolbar?: boolean;
  documentCollections?: boolean;
  linkTooltip?: boolean;
  steps?: boolean;
  primaryActionButton?: boolean;
  table?: boolean;
  list?: boolean;
};

export type PluginViewFactoryFn = (
  options: ReactPluginViewUserOptions,
) => PluginSpec<any>['view'];

export type NodeViewFactoryFn = (
  options: ReactNodeViewUserOptions,
) => NodeViewConstructor;
