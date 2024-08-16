'use client';
import { useEditorDragAndDrop } from '@/hooks/useEditorDragAndDrop';
import React from 'react';

export const Text = ({ text, fontSize = '16' }: { text: string; fontSize?: string }) => {
  const editorDragAndDrop = useEditorDragAndDrop();

  return (
    <div ref={editorDragAndDrop}>
      <p style={{ fontSize }}>{text}</p>
    </div>
  );
};
