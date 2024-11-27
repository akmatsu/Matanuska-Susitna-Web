import { listItemBlockComponent } from '@milkdown/kit/component/list-item-block';
import { Editor } from '@milkdown/kit/core';

export function configureListsFeature(editor: Editor) {
  editor.use(listItemBlockComponent);
}
