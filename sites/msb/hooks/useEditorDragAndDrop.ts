import { useNode } from '@craftjs/core';
import { type CoreEditor } from '@/components';

/**
 * Use to make an element drag and droppable within the {@link CoreEditor}
 */
export function useEditorDragAndDrop() {
  const {
    connectors: { connect, drag },
  } = useNode();

  return <T extends HTMLElement = HTMLElement>(ref: T | null) => {
    if (ref) connect(drag(ref));
  };
}
