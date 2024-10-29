import { $nodeSchema } from '@milkdown/kit/utils';

export const stepSchema = $nodeSchema('step', (ctx) => ({
  content: 'block+',
  group: 'step',
  defining: true,
  parseDOM: [
    {
      tag: 'li.step',
      getAttrs: (dom) => {
        if (!(dom instanceof HTMLElement)) throw new Error('DOM type error');
        return {};
      },
    },
  ],
  toDOM: (node) => ['li', { class: 'step' }, 0], // Render as <li> with "step" class
  parseMarkdown: {
    match: ({ type }) => type === 'step',
    runner: (state, node, type) => {
      state.openNode(type).next(node.children).closeNode();
    },
  },
  toMarkdown: {
    match: (node) => node.type.name === 'step',
    runner: (state, node) => {
      state.openNode('step');
      state.next(node.content);
      state.closeNode();
    },
  },
}));
