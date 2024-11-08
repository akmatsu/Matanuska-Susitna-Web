import { Ctx } from '@milkdown/kit/ctx';
import { removeRangeAndRunCommand } from './utils';
import { insert } from '@milkdown/kit/utils';
import { editorViewCtx } from '@milkdown/kit/core';
import { createTable } from '@milkdown/kit/preset/gfm';
import { MD_PAYMENTS_ALL_STEPS } from './mdTemplates';

export const SLASH_COMMANDS = [
  {
    label: 'Header 1',
    action: (ctx: Ctx) => {
      return removeRangeAndRunCommand(ctx, insert('#'));
    },
  },
  {
    label: 'Header 2',
    action: (ctx: Ctx) => {
      return removeRangeAndRunCommand(ctx, insert('##'));
    },
  },
  {
    label: 'Header 3',
    action: (ctx: Ctx) => {
      return removeRangeAndRunCommand(ctx, insert('###'));
    },
  },
  {
    label: 'Header 4',
    action: (ctx: Ctx) => {
      return removeRangeAndRunCommand(ctx, insert('####'));
    },
  },
  {
    label: 'Header 5',
    action: (ctx: Ctx) => {
      return removeRangeAndRunCommand(ctx, insert('#####'));
    },
  },
  {
    label: 'Header 6',
    action: (ctx: Ctx) => {
      return removeRangeAndRunCommand(ctx, insert('######'));
    },
  },
  {
    label: 'Quote',
    action: (ctx: Ctx) => {
      return removeRangeAndRunCommand(ctx, insert('>'));
    },
  },
  {
    label: 'Ordered List',
    action: (ctx: Ctx) => {
      return removeRangeAndRunCommand(ctx, insert('1.'));
    },
  },
  {
    label: 'Unordered List',
    action: (ctx: Ctx) => {
      return removeRangeAndRunCommand(ctx, insert('-'));
    },
  },
  {
    label: 'Divider',
    action: (ctx: Ctx) => {
      return removeRangeAndRunCommand(ctx, insert('---'));
    },
  },

  {
    label: 'Table',
    action: (ctx: Ctx) => {
      const view = ctx.get(editorViewCtx);
      const { dispatch, state } = view;
      const tr = state.tr;
      const selection = state.selection;
      const { from } = selection;
      tr.deleteRange(from - 1, from);
      const table = createTable(ctx, 3, 3);
      tr.replaceSelectionWith(table);
      dispatch(tr);
    },
  },
  {
    label: 'Primary Action Button',
    action: (ctx: Ctx) => {
      return removeRangeAndRunCommand(
        ctx,
        insert('::primary-action-button{label="Primary Action"}'),
      );
    },
  },
  {
    label: 'Document Collection',
    action: (ctx: Ctx) => {
      return removeRangeAndRunCommand(ctx, insert('::doc-collection{id=""}'));
    },
  },
  {
    label: 'Step template: Payments',
    action: (ctx: Ctx) => {
      return removeRangeAndRunCommand(ctx, insert(MD_PAYMENTS_ALL_STEPS));
    },
  },
];
