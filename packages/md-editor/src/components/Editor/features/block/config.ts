import { Editor } from '@milkdown/kit/core';
import { block, blockConfig } from '@milkdown/kit/plugin/block';
import { ReactPluginViewUserOptions } from '@prosemirror-adapter/react';
import { BlockView } from './BlockView';
import { PluginSpec } from '@milkdown/kit/prose/state';
import { PluginViewFactoryFn } from '../../types';
import { findParent } from '@milkdown/kit/prose';

export function configureBlockFeature(
  editor: Editor,
  pluginViewFactory: PluginViewFactoryFn,
) {
  editor.config((ctx) => {
    // ctx.update(blockConfig.key, (defaultConfig) => ({
    //   ...defaultConfig,
    // }));
    ctx.set(blockConfig.key, {
      filterNodes: (pos) => {
        const filter = findParent((node) =>
          ['table', 'blockquote'].includes(node.type.name),
        )(pos);
        if (filter) {
          return false;
        }
        return true;
      },
    });
    ctx.set(block.key, {
      view: pluginViewFactory({
        component: BlockView,
      }),
    });
  });
  editor.use(block);
}
