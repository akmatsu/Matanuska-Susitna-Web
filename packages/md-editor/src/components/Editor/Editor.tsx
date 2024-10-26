// React imports
import React from 'react';
import {
  defaultValueCtx,
  Editor as MilkEditor,
  rootCtx,
} from '@milkdown/kit/core';
import { Milkdown, MilkdownProvider, useEditor } from '@milkdown/react';
import {
  ProsemirrorAdapterProvider,
  useNodeViewFactory,
  usePluginViewFactory,
} from '@prosemirror-adapter/react';

// Milkdown Presets
import { gfm } from '@milkdown/kit/preset/gfm';
import { nord } from '@milkdown/theme-nord';
import { commonmark } from '@milkdown/kit/preset/commonmark';

// Milkdown Utils
import { $view } from '@milkdown/kit/utils';

// Milkdown components
import { imageBlockComponent } from '@milkdown/kit/component/image-block';
import { tableBlock } from '@milkdown/kit/component/table-block';
import { listItemBlockComponent } from '@milkdown/kit/component/list-item-block';
import {
  linkTooltipPlugin,
  configureLinkTooltip,
} from '@milkdown/kit/component/link-tooltip';

// Milkdown Plugins
import { history } from '@milkdown/kit/plugin/history';
import { trailing } from '@milkdown/kit/plugin/trailing';
import { cursor } from '@milkdown/kit/plugin/cursor';
import { block } from '@milkdown/kit/plugin/block';
import { indent } from '@milkdown/kit/plugin/indent';
import { listenerCtx, listener } from '@milkdown/kit/plugin/listener';
import { clipboard } from '@milkdown/kit/plugin/clipboard';

// Milkdown Styles
import '@milkdown/theme-nord/style.css';

// Internal imports
import {
  DocCollectionNode,
  DocCollectionInputRule,
  DocCollectionView,
  remarkDirective,
  BlockView,
  slash,
  SlashView,
  toolbar,
  ToolbarView,
} from './features';
import { MdEditorProps } from './types';
import {
  DocCollectionSearchView,
  docSearch,
} from './features/DocCollection/DocuCollectonSearchView';

export function Editor(props: MdEditorProps) {
  const nodeViewFactory = useNodeViewFactory();
  const pluginViewFactory = usePluginViewFactory();

  const { get } = useEditor((root) => {
    return MilkEditor.make()
      .config((ctx) => {
        ctx.set(rootCtx, root);
        ctx.set(defaultValueCtx, props.initialValue);
        ctx.set(block.key, {
          view: pluginViewFactory({
            component: BlockView,
          }),
        });
        ctx.set(slash.key, {
          view: pluginViewFactory({
            component: SlashView,
          }),
        });
        ctx.set(toolbar.key, {
          view: pluginViewFactory({
            component: ToolbarView,
          }),
        });
        ctx.set(docSearch.key, {
          view: pluginViewFactory({
            component: DocCollectionSearchView,
          }),
        });
        ctx.get(listenerCtx).markdownUpdated((_, md) => {
          props.onChange?.(md);
        });
      })
      .config(nord)
      .config(configureLinkTooltip)
      .use(commonmark)
      .use(gfm)
      .use(history)
      .use(listener)
      .use([...remarkDirective])
      .use(DocCollectionNode)
      .use(DocCollectionInputRule)
      .use(imageBlockComponent)
      .use(linkTooltipPlugin)
      .use(listItemBlockComponent)
      .use(tableBlock)
      .use(trailing)
      .use(cursor)
      .use(block)
      .use(indent)
      .use(clipboard)
      .use(slash)
      .use(toolbar)
      .use(docSearch)
      .use(
        $view(DocCollectionNode, () =>
          nodeViewFactory({
            component: DocCollectionView,
          }),
        ),
      );
  });

  return <Milkdown />;
}

export function MdEditor(props: MdEditorProps) {
  return (
    <MilkdownProvider>
      <ProsemirrorAdapterProvider>
        <Editor {...props} />
      </ProsemirrorAdapterProvider>
    </MilkdownProvider>
  );
}
