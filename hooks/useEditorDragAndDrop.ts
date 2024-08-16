import { useNode } from '@craftjs/core';

export function useEditorDragAndDrop() {
  const {
    connectors: { connect, drag },
  } = useNode();

  return <T extends HTMLElement = HTMLElement>(ref: T | null) => {
    if (ref) connect(drag(ref));
  };
}
