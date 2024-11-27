import {
  tableBlock,
  tableBlockConfig,
} from '@milkdown/kit/component/table-block';
import { Editor } from '@milkdown/kit/core';

export function configureTableFeature(editor: Editor) {
  editor
    .config((ctx) => {
      ctx.update(tableBlockConfig.key, (defaultConfig) => ({
        ...defaultConfig,
      }));
    })
    .use(tableBlock);
}
