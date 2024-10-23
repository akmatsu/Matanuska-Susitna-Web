import React, { useEffect, useRef, useState } from 'react';
import { gfm } from '@milkdown/kit/preset/gfm';
import { listenerCtx, listener } from '@milkdown/kit/plugin/listener';
import { MdEditorProps } from './types';
import { ProsemirrorAdapterProvider } from '@prosemirror-adapter/react';
import { Crepe } from '@milkdown/crepe';
import {
  iframeInputRule,
  iframeNode,
  remarkDirective,
} from './features/iframe';

export function Editor(props: MdEditorProps) {
  const [instance, setInstance] = useState<Crepe>();
  const rootEl = useRef<HTMLDivElement>();

  useEffect(() => {
    if (instance) instance.destroy();
    const crepe = new Crepe({
      root: document.getElementById('custom-editor'),
      defaultValue: props.initialValue,
    });

    crepe.create();

    crepe.editor
      .config((ctx) => {
        ctx.get(listenerCtx).markdownUpdated((_, md) => {
          props.onChange?.(md);
        });
      })
      .use(listener)
      .use(gfm)
      .use([...remarkDirective, iframeNode, iframeInputRule]);

    setInstance(crepe);
  }, [rootEl]);

  return <div id="custom-editor" ref={rootEl}></div>;
}

export function MdEditor(props: MdEditorProps) {
  return (
    <ProsemirrorAdapterProvider>
      <Editor {...props} />
    </ProsemirrorAdapterProvider>
  );
}
