import React, { useRef } from 'react';
import { useInstance } from '@milkdown/react';
import { paragraphSchema } from '@milkdown/kit/preset/commonmark';
import { slash } from '../slash';
import { useBlockProvider } from './hooks';
import { usePluginViewContext } from '@prosemirror-adapter/react';
import { TextSelection } from '@milkdown/kit/prose/state';
import { insert } from '@milkdown/kit/utils';

export function BlockView() {
  const ref = useRef<HTMLDivElement>(null);

  const [_, get] = useInstance();
  const { provider } = useBlockProvider(ref);
  const { view } = usePluginViewContext();

  function handleMouseDown(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
  }

  function handleMouseUp(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();

    const ctx = get().ctx;
    if (!view.hasFocus()) view.focus();

    const { state, dispatch } = view;
    const active = provider.current.active;
    if (!active) return;

    const $pos = active.$pos;
    const pos = $pos.pos + active.node.nodeSize;

    const content = active.node.content;

    if (content.content.length) {
      let tr = state.tr.insert(pos, paragraphSchema.type(ctx).create(null));
      tr = tr.setSelection(TextSelection.near(tr.doc.resolve(pos)));
      dispatch(tr.scrollIntoView());
      ctx.get(slash.key).show(tr.selection.from);
    } else {
      let tr = state.tr;

      tr.setSelection(TextSelection.near(tr.doc.resolve(state.selection.from)));
      dispatch(tr.scrollIntoView());
      ctx.get(slash.key).show(tr.selection.from);
    }

    provider.current.hide();
  }

  return (
    <div
      ref={ref}
      className="absolute flex flex-col gap-2 transition-all data-[show=false]:opacity-0"
    >
      <div className="h-auto w-auto p-2 bg-gray-200 rounded hover:bg-gray-300 shadow cursor-move transition-all flex flex-col justify-center">
        <span className="icon-[icon-park-outline--drag] size-4"></span>
      </div>
      <div
        className="h-auto w-auto p-2 bg-gray-200 rounded hover:bg-gray-300 shadow cursor-pointer transition-all flex flex-col justify-center"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <span className="icon-[ri--add-fill] size-4"></span>
      </div>
    </div>
  );
}
