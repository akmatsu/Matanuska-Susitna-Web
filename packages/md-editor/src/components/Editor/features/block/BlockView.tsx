import React, { MouseEventHandler, useEffect, useRef } from 'react';
import { BlockProvider } from '@milkdown/kit/plugin/block';
import { useInstance } from '@milkdown/react';
import { editorViewCtx } from '@milkdown/kit/core';
import { paragraphSchema } from '@milkdown/kit/preset/commonmark';
import { slash } from '../slash';

export function BlockView() {
  const ref = useRef<HTMLDivElement>(null);
  const tooltipProvider = useRef<BlockProvider>();

  const [loading, get] = useInstance();

  useEffect(() => {
    const div = ref.current;
    if (loading || !div) return;

    const editor = get();
    if (!editor) return;

    tooltipProvider.current = new BlockProvider({
      ctx: editor.ctx,
      content: div,
      getOffset: () => 16,

      getPlacement: ({ active, blockDom }) => {
        if (active.node.type.name === 'heading') {
          return 'left';
        }
        let totalDescendant = 0;
        active.node.descendants((node) => {
          totalDescendant += node.childCount;
        });

        const dom = active.el;
        const domRect = dom.getBoundingClientRect();
        const handleRect = blockDom.getBoundingClientRect();
        const style = window.getComputedStyle(dom);
        const paddingTop = Number.parseInt(style.paddingTop, 10) || 0;
        const paddingBottom = Number.parseInt(style.paddingBottom, 10) || 0;
        const height = domRect.height - paddingTop - paddingBottom;
        const handleHeight = handleRect.height;

        return totalDescendant > 2 || handleHeight < height
          ? 'left-start'
          : 'left';
      },
      shouldShow: (view) => {
        return true;
      },
    });
    tooltipProvider.current?.update();

    return () => {
      tooltipProvider.current?.destroy();
    };
  }, [loading]);

  function handleMouseDown(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();

    const ctx = get().ctx;
    const view = ctx.get(editorViewCtx);
    if (!view.hasFocus()) view.focus();

    const { state, dispatch } = view;
    const active = tooltipProvider.current.active;
    if (!active) return;

    const $pos = active.$pos;
    const pos = $pos.pos + active.node.nodeSize;
    let tr = state.tr.insert(pos, paragraphSchema.type(ctx).create());

    dispatch(tr.scrollIntoView());
    tooltipProvider.current.hide();
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
