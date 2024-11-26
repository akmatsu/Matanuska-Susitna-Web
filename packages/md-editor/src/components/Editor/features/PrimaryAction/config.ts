import { Editor } from '@milkdown/kit/core';
import { PrimaryActionButtonNode, PrimaryActionInputRule } from './schema';
import { $view } from '@milkdown/kit/utils';
import { NodeViewFactoryFn } from '../../types';
import { PrimaryActionView } from './PrimaryActionView';

export function configurePrimaryActionButtonFeature(
  editor: Editor,
  nodeViewFactory: NodeViewFactoryFn,
) {
  editor
    .use(PrimaryActionButtonNode)
    .use(PrimaryActionInputRule)
    .use(
      $view(PrimaryActionButtonNode, () =>
        nodeViewFactory({ component: PrimaryActionView }),
      ),
    );
}
