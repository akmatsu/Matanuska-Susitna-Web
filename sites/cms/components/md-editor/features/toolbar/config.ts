import { Editor } from '@milkdown/kit/core';
import { tooltipFactory } from '@milkdown/kit/plugin/tooltip';
import { PluginViewFactoryFn } from '../../types';
import { ToolbarView } from './ToolbarView';
import { toggleHeaderCommand } from './commands';

export const toolbar = tooltipFactory('toolbar');

export function configureToolbarFeature(
  editor: Editor,
  pluginViewFactory: PluginViewFactoryFn,
) {
  editor
    .config((ctx) => {
      ctx.set(toolbar.key, {
        view: pluginViewFactory({ component: ToolbarView }),
      });
    })
    .use(toolbar)
    .use(toggleHeaderCommand);
}
