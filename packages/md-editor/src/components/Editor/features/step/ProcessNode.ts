import { wrappingInputRule } from '@milkdown/kit/prose/inputrules';
import { $command, $inputRule, $nodeSchema } from '@milkdown/kit/utils';
import { wrapIn } from '@milkdown/kit/prose/commands';

export const processSchema = $nodeSchema('process', (ctx) => ({
  content: 'step+', // Process will contain multiple Step nodes
  group: 'block', // Group this as a block node
  attrs: {
    order: {
      default: 1,
    },
  },
  parseDOM: [
    {
      tag: 'ol.process',
      getAttrs: (dom) => {
        if (!(dom instanceof HTMLElement)) throw new Error('DOM type error');
        return {
          order: dom.hasAttribute('start')
            ? Number(dom.getAttribute('start'))
            : 1,
          // spread: dom.dataset.spread === 'true', // Convert spread attribute to boolean
        };
      },
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
    match: ({ type }) => type === 'process',
    runner: (state, node, type) => {
      const spread = node.spread != null ? `${node.spread}` : 'true';
      state.openNode(type, { spread }).next(node.children).closeNode();
    },
  },

  toMarkdown: {
    match: (node) => node.type.name === 'process',
    runner: (state, node) => {
      state.openNode('process', undefined, {
        ordered: true,
        start: node.attrs.order,
        spread: node.attrs.spread === 'true',
      });
      state.next(node.content);
      state.closeNode();
    },
  },
}));

// Input rule to wrap a block into a process node
export const wrapInProcessInputRule = $inputRule((ctx) =>
  wrappingInputRule(
    /^\s*(step)\.\s$/,
    processSchema.type(ctx),

    // (match, node) => node.childCount + node.attrs.order === Number(match[1]),
  ),
);

export const wrapInProcessCommand = $command(
  'WrapInProcess',
  (ctx) => () => wrapIn(processSchema.type(ctx)),
);
