import { type PluginViewFactoryFn, type NodeViewFactoryFn } from '../../types';
import { Editor } from '@milkdown/kit/core';
import { DocCollectionSearchView } from './DocuCollectonSearchView';
import {
  DocCollectionInputRule,
  DocCollectionNode,
  docSearch,
  remarkDirective,
} from './schema';
import { $view } from '@milkdown/kit/utils';
import { DocCollectionView } from './DocCollectionView';

export function configDocCollectionFeature(
  editor: Editor,
  pluginViewFactory: PluginViewFactoryFn,
  nodeViewFactory: NodeViewFactoryFn,
) {
  editor
    .config((ctx) => {
      ctx.set(docSearch.key, {
        view: pluginViewFactory({
          component: DocCollectionSearchView,
        }),
      });
    })
    .use([...remarkDirective])
    .use(docSearch)
    .use(DocCollectionNode)
    .use(DocCollectionInputRule)
    .use(
      $view(DocCollectionNode, () =>
        nodeViewFactory({
          component: DocCollectionView,
        }),
      ),
    );
}
