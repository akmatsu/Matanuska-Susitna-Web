import React from 'react';
import { gfm } from '@milkdown/kit/preset/gfm';
import { listenerCtx, listener } from '@milkdown/kit/plugin/listener';
import { MdEditorProps } from './types';
import {
  ProsemirrorAdapterProvider,
  useNodeViewFactory,
} from '@prosemirror-adapter/react';
import { Crepe } from '@milkdown/crepe';
import {
  iframeInputRule,
  iframeNode,
  remarkDirective,
} from './features/iframe';
import { IframeView } from './features/iframe/IFrame';
import { $view } from '@milkdown/kit/utils';
import { Milkdown, MilkdownProvider, useEditor } from '@milkdown/react';
// import { slashMenuConfig } from '@milkdown/kit/component/slashmenu';

export function Editor(props: MdEditorProps) {
  const nodeViewFactory = useNodeViewFactory();

  const { get } = useEditor((root) => {
    const crepe = new Crepe({
      root,
      defaultValue: props.initialValue,
      featureConfigs: {
        'block-edit': {},
      },
    });
    crepe.create();
    return crepe.editor
      .config((ctx) => {
        ctx.get(listenerCtx).markdownUpdated((_, md) => {
          props.onChange?.(md);
        });
      })
      .use(listener)
      .use(gfm)
      .use([...remarkDirective])
      .use(iframeNode)
      .use(iframeInputRule)
      .use(
        $view(iframeNode, () =>
          nodeViewFactory({
            component: IframeView,
          }),
        ),
      );
  });

  return <Milkdown />;
}

export function MdEditor(props: MdEditorProps) {
  return (
    <MilkdownProvider>
      <ProsemirrorAdapterProvider>
        <Editor {...props} />
      </ProsemirrorAdapterProvider>
    </MilkdownProvider>
  );
}
