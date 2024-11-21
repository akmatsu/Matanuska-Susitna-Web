import React, { useEffect, useRef } from 'react';
import { BlockProvider } from '@milkdown/kit/plugin/block';
import { useInstance } from '@milkdown/react';
import { editorViewCtx } from '@milkdown/kit/core';
import { paragraphSchema } from '@milkdown/kit/preset/commonmark';
import { slash } from '../slash';
import { useBlockProvider } from './hooks/useBlockProvider';

export function BlockView() {
  const ref = useRef<HTMLDivElement>(null);

  const [_, get] = useInstance();
  const { provider } = useBlockProvider(ref);

  function handleMouseDown(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();

    const ctx = get().ctx;
    const view = ctx.get(editorViewCtx);
    if (!view.hasFocus()) view.focus();

    const { state, dispatch } = view;
    const active = provider.current.active;
    if (!active) return;

    const $pos = active.$pos;
    const pos = $pos.pos + active.node.nodeSize;
    let tr = state.tr.insert(pos, paragraphSchema.type(ctx).create());

    dispatch(tr.scrollIntoView());
    provider.current.hide();
    ctx.get(slash.key).show(tr.selection.from);
  }

  function handleMouseUp(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
  }

  return (
    <div ref={ref} className="absolute flex gap-2 transition-all">
      <div
        className="h-auto w-auto p-2 bg-gray-200 rounded hover:bg-gray-300 shadow cursor-grab transition-all flex flex-col justify-center"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <span className="icon-[ri--add-fill] size-6"></span>
      </div>
      <div className="h-auto w-auto p-2 bg-gray-200 rounded hover:bg-gray-300 shadow cursor-grab transition-all flex flex-col justify-center">
        <span className="icon-[icon-park-outline--drag] size-6"></span>
      </div>
    </div>
  );
}
