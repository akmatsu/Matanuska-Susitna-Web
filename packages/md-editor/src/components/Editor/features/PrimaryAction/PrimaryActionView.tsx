import { useNodeViewContext } from '@prosemirror-adapter/react';
import React from 'react';

export function PrimaryActionView() {
  const { contentRef } = useNodeViewContext();

  return <p ref={contentRef} className="primary-action"></p>;
}
