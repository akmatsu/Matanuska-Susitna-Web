import { InputRule } from '@milkdown/kit/prose/inputrules';
import { $inputRule, $node } from '@milkdown/kit/utils';

export const PrimaryActionButtonNode = $node('primary-action-button', () => ({
  group: 'block',
  defining: true,
  inline: false,
  draggable: true,
  selectable: true,
  content: 'text*',
  attrs: {
    label: {
      default: null,
    },
  },

  parseDOM: [
    {
      tag: 'p.primary-action',
    },
  ],
  toDOM: (node) => ['p', { class: 'primary-action bg-blue-500' }, 0],
  parseMarkdown: {
    match: ({ type, name }) =>
      type === 'leafDirective' && name === 'primary-action-button',
    runner: (state, node, type) => {
      state
        .openNode(type, {
          label: (node.attributes as { label: string }).label,
        })
        .addText((node.attributes as { label: string }).label)
        .closeNode();
    },
  },
  toMarkdown: {
    match: (node) => node.type.name === 'primary-action-button',
    runner: (state, node) => {
      state.addNode('leafDirective', undefined, undefined, {
        name: 'primary-action-button',
        attributes: { label: node.textContent },
      });
    },
  },
}));

export const PrimaryActionInputRule = $inputRule(
  (ctx) =>
    new InputRule(/^\s*(pbtn)\.\s$/, (state, match, start, end) => {
      const [okay] = match;
      const { tr } = state;
      if (okay) {
        tr.replaceWith(
          start - 1,
          end,
          PrimaryActionButtonNode.type(ctx).create(),
        );
      }
      return tr;
    }),
);
