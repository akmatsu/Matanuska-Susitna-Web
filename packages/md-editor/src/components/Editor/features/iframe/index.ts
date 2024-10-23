import { $inputRule, $node, $remark } from '@milkdown/kit/utils';
import { InputRule } from '@milkdown/kit/prose/inputrules';
import directive from 'remark-directive';

const remarkPluginId = 'iframe-plugin';
export const remarkDirective = $remark(remarkPluginId, () => directive);

const AST = {
  name: 'iframe',
  attributes: { src: 'https://saul-mirone.github.io' },
  type: 'leafDirective',
};

export const iframeNode = $node('iframe', () => ({
  group: 'block',
  atom: true,
  isolating: true,
  marks: '',
  attrs: {
    src: { default: null },
  },
  parseDOM: [
    {
      tag: 'iframe',
      getAttrs: (dom) => ({
        src: (dom as HTMLElement).getAttribute('src'),
      }),
    },
  ],
  toDOM: (node) => ['iframe', { ...node.attrs, contenteditable: false }],
  parseMarkdown: {
    match: (node) => node.type === 'leafDirective' && node.name === 'iframe',
    runner: (state, node, type) => {
      state.addNode(type, { src: (node.attributes as { src: string }).src });
    },
  },
  toMarkdown: {
    match: (node) => node.type.name === 'iframe',
    runner: (state, node) => {
      state.addNode('leafDirective', undefined, undefined, {
        name: 'iframe',
        attributes: { src: node.attrs.src },
      });
    },
  },
}));

export const iframeInputRule = $inputRule(
  (ctx) =>
    new InputRule(
      /::iframe\{src\="(?<src>[^"]+)?"?\}/,
      (state, match, start, end) => {
        const [okay, src = ''] = match;
        const { tr } = state;
        if (okay) {
          tr.replaceWith(start - 1, end, iframeNode.type(ctx).create({ src }));
        }
        return tr;
      },
    ),
);
