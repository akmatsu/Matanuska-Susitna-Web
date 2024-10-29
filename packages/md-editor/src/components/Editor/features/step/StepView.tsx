import React, { useEffect, useRef } from 'react';
import { useNodeViewContext } from '@prosemirror-adapter/react';

export function StepView() {
  const { contentRef, node, selected } = useNodeViewContext();

  return (
    <li className="step min-h-7 pa-2 flex gap-2 my-2">
      <div
        ref={contentRef}
        className="step-content border-l-4 border-gray-300"
      ></div>
    </li>
  );
}
