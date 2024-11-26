import { defaultValueCtx, Editor, rootCtx } from '@milkdown/kit/core';
import { MdEditorProps } from '../../types';
import { listener, listenerCtx } from '@milkdown/kit/plugin/listener';
import { commonmark } from '@milkdown/kit/preset/commonmark';
import { gfm } from '@milkdown/kit/preset/gfm';
import { history } from '@milkdown/kit/plugin/history';
import { trailing } from '@milkdown/kit/plugin/trailing';
import { cursor } from '@milkdown/kit/plugin/cursor';
import { indent } from '@milkdown/kit/plugin/indent';
import { clipboard } from '@milkdown/kit/plugin/clipboard';

export function configureBaseFeatures(
  editor: Editor,
  root: HTMLElement,
  props: MdEditorProps,
) {
  editor
    .config((ctx) => {
      ctx.set(rootCtx, root);
      ctx.set(defaultValueCtx, props.initialValue);
      ctx.get(listenerCtx).markdownUpdated((_, md) => {
        props.onChange?.(md);
      });
    })
    .use(commonmark)
    .use(gfm)
    .use(history)
    .use(listener)
    .use(trailing)
    .use(cursor)
    .use(indent)
    .use(clipboard);
}
