import { Editor } from '@milkdown/kit/core';
import { PluginViewFactoryFn } from '../../types';
import { slash, SlashView } from './SlashView';

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
