import { $inputRule, $node, $remark } from '@milkdown/kit/utils';
import { InputRule } from '@milkdown/kit/prose/inputrules';
import directive from 'remark-directive';
import { tooltipFactory } from '@milkdown/kit/plugin/tooltip';

export const docSearch = tooltipFactory('docSearch');
const remarkPluginId = 'doc-collection-plugin';
export const remarkDirective = $remark(remarkPluginId, () => directive);

export const DocCollectionNode = $node('doc-collection', () => ({
  group: 'block',
  atom: true,
  isolating: true,
  marks: '',
  attrs: {
    id: { default: null },
  },
  parseDOM: [
    {
      tag: 'div',
      getAttrs: (dom) => ({
        id: (dom as HTMLElement).getAttribute('id'),
      }),
    },
  ],
  toDOM: (node) => [
    'doc-collection',
    { ...node.attrs, contenteditable: false },
  ],
  parseMarkdown: {
    match: (node) =>
      node.type === 'leafDirective' && node.name === 'doc-collection',
    runner: (state, node, type) => {
      state.addNode(type, { id: (node.attributes as { id: string }).id });
    },
  },
  toMarkdown: {
    match: (node) => node.type.name === 'doc-collection',
    runner: (state, node) => {
      state.addNode('leafDirective', undefined, undefined, {
        name: 'doc-collection',
        attributes: { id: node.attrs.id },
      });
    },
  },
}));

export const DocCollectionInputRule = $inputRule(
  (ctx) =>
    new InputRule(
      /::doc-collection\{id\="(?<id>[^"]+)?"?\}/,
      (state, match, start, end) => {
        const [okay, id = ''] = match;
        const { tr } = state;
        if (okay) {
          tr.replaceWith(
            start - 1,
            end,
            DocCollectionNode.type(ctx).create({ id }),
          );
        }
        return tr;
      },
    ),
);
