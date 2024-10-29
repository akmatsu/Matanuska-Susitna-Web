import React, { useRef } from 'react';
import { useNodeViewContext } from '@prosemirror-adapter/react';

export function StepView() {
  const { contentRef, node } = useNodeViewContext();

  return (
    <li
      className="step border border-red-500 min-h-7 pa-2"
      ref={contentRef}
    ></li>
  );
}
