import { wrappingInputRule } from '@milkdown/kit/prose/inputrules';
import { $command, $inputRule, $node } from '@milkdown/kit/utils';
import { wrapIn } from '@milkdown/kit/prose/commands';

export const processSchema = $node('process', (ctx) => ({
  content: 'step+',
  group: 'block',
  attrs: {},

  parseDOM: [
    {
      tag: 'ol.process',
    },
  ],

  toDOM: (node) => [
    'ol',
    {
      class: 'process',
      start: node.attrs.order === 1 ? null : node.attrs.order,
      'data-spread': node.attrs.spread ? 'true' : 'false',
    },
    0,
  ],

  parseMarkdown: {
    match: ({ type, name }) =>
      type === 'containerDirective' && name === 'process',
    runner: (state, node, type) => {
      state.openNode(type).next(node.children).closeNode();
    },
  },

  toMarkdown: {
    match: (node) => node.type.name === 'process',
    runner: (state, node) => {
      state.openNode('containerDirective', undefined, {
        name: 'process',
      });
      state.next(node.content);
      state.closeNode();
    },
  },
}));

// Input rule to wrap a block into a process node
export const wrapInProcessInputRule = $inputRule((ctx) =>
  wrappingInputRule(/^\s*(step)\.\s$/, processSchema.type(ctx)),
);

export const wrapInProcessCommand = $command(
  'WrapInProcess',
  (ctx) => () => wrapIn(processSchema.type(ctx)),
);
