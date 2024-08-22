import { NodeTree, useEditor } from '@craftjs/core';
import React from 'react';

/**
 * Use this hook to create a droppable component within the Editor toolbox
 */
export function useEditorToolbox() {
  const { connectors, query } = useEditor();

  return <T extends HTMLElement = HTMLElement>(
    ref: T | null,
    component:
      | React.ReactElement<any, string | React.JSXElementConstructor<any>>
      | (() => NodeTree | React.ReactElement)
  ) => {
    if (ref) connectors.create(ref, component);
  };
}
