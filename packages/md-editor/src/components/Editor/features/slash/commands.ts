import { Ctx } from '@milkdown/kit/ctx';
import {
  clearContentAndAddBlockType,
  clearContentAndInsert,
  clearContentAndSetBlockType,
  clearContentAndWrapInBlockType,
  clearRange,
  runCommand,
} from './utils';

import { Cmd, editorViewCtx } from '@milkdown/kit/core';
import { createTable } from '@milkdown/kit/preset/gfm';
import { MD_PAYMENTS_ALL_STEPS } from './mdTemplates';
import {
  blockquoteSchema,
  bulletListSchema,
  headingSchema,
  hrSchema,
  orderedListSchema,
} from '@milkdown/kit/preset/commonmark';
import { NodeSelection } from '@milkdown/kit/prose/state';
import { PrimaryActionButtonNode } from '../PrimaryAction';
import { DocCollectionNode } from '../DocCollection/schema';
import { $command } from '@milkdown/kit/utils';
import { toggleMark } from '@milkdown/kit/prose/commands';

export const SLASH_COMMANDS = [
  {
    label: 'Header 1',
    action: (ctx: Ctx) => {
      return runCommand(
        ctx,
        clearContentAndSetBlockType(headingSchema.type(ctx), { level: 1 }),
      );
    },
  },
  {
    label: 'Header 2',
    action: (ctx: Ctx) => {
      return runCommand(
        ctx,
        clearContentAndSetBlockType(headingSchema.type(ctx), { level: 2 }),
      );
    },
  },
  {
    label: 'Header 3',
    action: (ctx: Ctx) => {
      return runCommand(
        ctx,
        clearContentAndSetBlockType(headingSchema.type(ctx), { level: 3 }),
      );
    },
  },
  {
    label: 'Header 4',
    action: (ctx: Ctx) => {
      return runCommand(
        ctx,
        clearContentAndSetBlockType(headingSchema.type(ctx), { level: 4 }),
      );
    },
  },
  {
    label: 'Header 5',
    action: (ctx: Ctx) => {
      return runCommand(
        ctx,
        clearContentAndSetBlockType(headingSchema.type(ctx), { level: 5 }),
      );
    },
  },
  {
    label: 'Header 6',
    action: (ctx: Ctx) => {
      return runCommand(
        ctx,
        clearContentAndSetBlockType(headingSchema.type(ctx), { level: 6 }),
      );
    },
  },
  {
    label: 'Quote',
    action: (ctx: Ctx) => {
      return runCommand(
        ctx,
        clearContentAndWrapInBlockType(blockquoteSchema.type(ctx)),
      );
    },
  },
  {
    label: 'Divider',
    action: (ctx: Ctx) => {
      return runCommand(ctx, clearContentAndAddBlockType(hrSchema.type(ctx)));
    },
  },
  {
    label: 'Ordered List',
    action: (ctx: Ctx) => {
      return runCommand(
        ctx,
        clearContentAndWrapInBlockType(orderedListSchema.type(ctx)),
      );
    },
  },
  {
    label: 'Unordered List',
    action: (ctx: Ctx) => {
      return runCommand(
        ctx,
        clearContentAndWrapInBlockType(bulletListSchema.type(ctx)),
      );
    },
  },

  {
    label: 'Table',
    action: (ctx: Ctx) => {
      const view = ctx.get(editorViewCtx);
      const { dispatch, state } = view;
      const tr = clearRange(state.tr);
      const table = createTable(ctx, 3, 3);
      tr.replaceSelectionWith(table);
      const { from } = tr.selection;
      const pos = from - table.nodeSize + 2;
      dispatch(tr);
      requestAnimationFrame(() => {
        const selection = NodeSelection.create(view.state.tr.doc, pos);
        dispatch(view.state.tr.setSelection(selection).scrollIntoView());
      });
    },
  },
  {
    label: 'Primary Action Button',
    action: (ctx: Ctx) => {
      return runCommand(
        ctx,
        clearContentAndSetBlockType(PrimaryActionButtonNode.type(ctx), {
          label: 'Primary Action',
        }),
      );
    },
  },
  {
    label: 'Document Collection',
    action: (ctx: Ctx) => {
      return runCommand(
        ctx,
        clearContentAndAddBlockType(DocCollectionNode.type(ctx), { id: '' }),
      );
    },
  },
  {
    label: 'Step template: Payments',
    action: (ctx: Ctx) => {
      return runCommand(ctx, clearContentAndInsert(ctx, MD_PAYMENTS_ALL_STEPS));
    },
  },
];
