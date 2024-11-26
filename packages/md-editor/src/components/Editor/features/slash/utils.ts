import { editorViewCtx } from '@milkdown/kit/core';
import { Ctx } from '@milkdown/kit/ctx';
import { NodeType, Attrs } from '@milkdown/kit/prose/model';
import { Command, Selection, Transaction } from '@milkdown/kit/prose/state';
import { findWrapping } from '@milkdown/kit/prose/transform';
import { insert } from '@milkdown/kit/utils';

export function isInCodeBlock(selection: Selection) {
  const type = selection.$from.node(selection.$from.depth - 1)?.type;
  return type?.name === 'code_block';
}

export function isInList(selection: Selection) {
  const type = selection.$from.node(selection.$from.depth - 1)?.type;
  return type?.name === 'list_item';
}

export function runCommand(ctx: Ctx, fn: Command) {
  const view = ctx.get(editorViewCtx);
  const { dispatch, state } = view;
  fn(state, dispatch);
}

export function clearRange(tr: Transaction) {
  const { $from, $to } = tr.selection;
  const { pos: from } = $from;
  const { pos: to } = $to;
  tr = tr.deleteRange(from - $from.node().content.size, to);
  return tr;
}

export function setBlockType(
  tr: Transaction,
  nodeType: NodeType,
  attrs: Attrs | null = null,
) {
  const { to, from } = tr.selection;
  return tr.setBlockType(from, to, nodeType, attrs);
}

export function wrapInBlockType(
  tr: Transaction,
  nodeType: NodeType,
  attrs: Attrs | null = null,
) {
  const { $from, $to } = tr.selection;

  const range = $from.blockRange($to);
  const wrapping = range && findWrapping(range, nodeType, attrs);
  if (!wrapping) {
    return null;
  }
  return tr.wrap(range, wrapping);
}

export function addBlockType(
  tr: Transaction,
  nodeType: NodeType,
  attrs: Attrs | null = null,
) {
  const node = nodeType.createAndFill(attrs);
  if (!node) return null;

  return tr.replaceSelectionWith(node);
}

export function clearContentAndInsert(ctx: Ctx, value: string): Command {
  return (state, dispatch) => {
    if (dispatch) {
      const tr = clearRange(state.tr);
      insert(value)(ctx);
      dispatch(tr);
    }
    return true;
  };
}

export function removeRangeAndRunCommand(ctx: Ctx, fn: (ctx: Ctx) => void) {
  const view = ctx.get(editorViewCtx);
  const { dispatch, state } = view;
  const { tr, selection } = state;
  const { from } = selection;
  dispatch(tr.deleteRange(from - 1, from));
  view.focus();
  return fn(ctx);
}

export function clearContentAndSetBlockType(
  nodeType: NodeType,
  attrs: Attrs | null = null,
): Command {
  return (state, dispatch) => {
    if (dispatch) {
      const tr = setBlockType(clearRange(state.tr), nodeType, attrs);
      dispatch(tr.scrollIntoView());
    }
    return true;
  };
}

export function clearContentAndWrapInBlockType(
  nodeType: NodeType,
  attrs: Attrs | null = null,
): Command {
  return (state, dispatch) => {
    const tr = wrapInBlockType(clearRange(state.tr), nodeType, attrs);
    if (!tr) {
      return false;
    }
    if (dispatch) {
      dispatch(tr.scrollIntoView());
    }
    return true;
  };
}

export function clearContentAndAddBlockType(
  nodeType: NodeType,
  attrs: Attrs | null = null,
): Command {
  return (state, dispatch) => {
    const tr = addBlockType(clearRange(state.tr), nodeType, attrs);
    if (!tr) return false;

    if (dispatch) dispatch(tr.scrollIntoView());

    return true;
  };
}
