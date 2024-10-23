import { Ctx } from '@milkdown/kit/ctx';
import { removeRangeAndRunCommand } from './utils';
import { insert } from '@milkdown/kit/utils';

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
    label: 'Document Collection',
    action: (ctx: Ctx) => {
      return removeRangeAndRunCommand(ctx, insert('::doc-collection{id=""}'));
    },
  },
];
