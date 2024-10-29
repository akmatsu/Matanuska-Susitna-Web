import React from 'react';
import { useNodeViewContext } from '@prosemirror-adapter/react';

export function ProcessView() {
  const { contentRef, node } = useNodeViewContext();

  return (
    <ol className="process" start={node.attrs.start} ref={contentRef}></ol>
  );
}
