import { wrappingInputRule } from '@milkdown/kit/prose/inputrules';
import { $command, $inputRule, $node } from '@milkdown/kit/utils';
import { wrapIn } from '@milkdown/kit/prose/commands';

export const processSchema = $node('process', (ctx) => ({
  content: 'step+', // Process will contain multiple Step nodes
  group: 'block', // Group this as a block node
  attrs: {},
  parseDOM: [
    {
      tag: 'ol.process',
    },
  ],

  // Render the process node in the DOM
  toDOM: (node) => [
    'ol', // Ordered list for the process
    {
      class: 'process', // Custom class for the process
      start: node.attrs.order === 1 ? null : node.attrs.order, // Only include "start" attribute if it's not 1
      'data-spread': node.attrs.spread ? 'true' : 'false', // Set the spread data attribute
    },
    0, // The process will contain steps here
  ],

  parseMarkdown: {
    match: ({ type, name }) => type === 'list' && name === 'process',
    runner: (state, node, type) => {
      state.openNode(type).next(node.children).closeNode();
    },
  },

  toMarkdown: {
    match: (node) => node.type.name === 'process',
    runner: (state, node) => {
      state.openNode('list', undefined, {
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
