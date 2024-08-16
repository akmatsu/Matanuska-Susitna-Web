import { useNode } from '@craftjs/core';
import { type CoreEditor } from '@/components';

/**
 * Use to make a component a droppable area for other components in the {@link CoreEditor }
 * @returns
 */
export function useEditorCanvas() {
  const {
    connectors: { connect },
  } = useNode();

  return connect;
}
