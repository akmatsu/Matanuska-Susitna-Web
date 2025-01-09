import { BlockProvider } from '@milkdown/kit/plugin/block';
import { useInstance } from '@milkdown/react';
import { MutableRefObject, useEffect, useRef } from 'react';

export function useBlockProvider(contentRef: MutableRefObject<HTMLDivElement>) {
  const [loading, get] = useInstance();
  const provider = useRef<BlockProvider>(null);

  useEffect(() => {
    const div = contentRef.current;
    if (loading || !div) return;

    const editor = get();
    if (!editor) return;

    provider.current = new BlockProvider({
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

        const { handleHeight, height } = getHandleHeight(active.el, blockDom);

        return totalDescendant > 2 || handleHeight < height
          ? 'left-start'
          : 'left';
      },
    });

    return () => {
      provider.current?.destroy();
    };
  }, [loading]);

  useEffect(() => {
    provider.current?.update();
  });

  return { provider };
}

function getHandleHeight(dom: HTMLElement, blockDom: HTMLElement) {
  const domRect = dom.getBoundingClientRect();
  const handleRect = blockDom.getBoundingClientRect();
  const style = window.getComputedStyle(dom);
  const paddingTop = Number.parseInt(style.paddingTop, 10) || 0;
  const paddingBottom = Number.parseInt(style.paddingBottom, 10) || 0;
  const height = domRect.height - paddingTop - paddingBottom;
  const handleHeight = handleRect.height;

  return { height, handleHeight };
}
