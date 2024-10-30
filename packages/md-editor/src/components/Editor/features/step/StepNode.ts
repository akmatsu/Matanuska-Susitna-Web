import { $node } from '@milkdown/kit/utils';

export const stepSchema = $node('step', (ctx) => ({
  content: 'block+',
  group: 'step',
  defining: true,
  attrs: {
    label: {
      default: 'st.',
    },
    listType: {
      default: 'step',
    },
  },
  parseDOM: [
    {
      tag: 'li.step',
      getAttrs: (dom) => {
        if (!(dom instanceof HTMLElement)) throw new Error('DOM type error');
        return {};
      },
    },
  ],
  toDOM: (node) => [
    'li',
    {
      class: 'step',
      'data-label': node.attrs.label,
      'data-list-type': node.attrs.listType,
    },
    0,
  ], // Render as <li> with "step" class
  parseMarkdown: {
    match: ({ type, name }) => type === 'containerDirective' && name === 'step',
    runner: (state, node, type) => {
      console.log('ran');
      const label = node.label ? `${node.label}` : 'step.';
      const listType = 'step';
      state.openNode(type, { label, listType }).next(node.children).closeNode();
    },
  },
  toMarkdown: {
    match: (node) => node.type.name === 'step',
    runner: (state, node) => {
      state.openNode('containerDirective', undefined, {
        name: 'step',
        label: 'step.',
      });
      state.next(node.content);
      state.closeNode();
    },
  },
}));
