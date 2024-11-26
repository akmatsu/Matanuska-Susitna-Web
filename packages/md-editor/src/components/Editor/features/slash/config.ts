import { Editor } from '@milkdown/kit/core';
import { PluginViewFactoryFn } from '../../types';
import { SlashView } from './SlashView';
import { slashFactory } from '@milkdown/kit/plugin/slash';
export const slash = slashFactory('Commands');

export function configureSlashFeature(
  editor: Editor,
  pluginViewFactory: PluginViewFactoryFn,
) {
  editor
    .config((ctx) =>
      ctx.set(slash.key, {
        view: pluginViewFactory({
          component: SlashView,
        }),
      }),
    )
    .use(slash);
}
