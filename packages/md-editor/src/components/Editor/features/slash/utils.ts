import { editorViewCtx } from '@milkdown/kit/core';
import { Ctx } from '@milkdown/kit/ctx';

export function removeRangeAndRunCommand(ctx: Ctx, fn: (ctx: Ctx) => void) {
  const view = ctx.get(editorViewCtx);
  const { dispatch, state } = view;
  const { tr, selection } = state;
  const { from } = selection;
  dispatch(tr.deleteRange(from - 1, from));
  view.focus();
  return fn(ctx);
}
