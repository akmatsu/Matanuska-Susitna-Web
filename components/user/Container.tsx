'use client';
import { useEditorDragAndDrop } from '@/hooks/useEditorDragAndDrop';
import { Paper } from '@mui/material';
import React from 'react';

export type ContainerProps = {
  // Provide a hexcode for the element background color
  background: string;
  // Padding in pixels.
  padding?: number | string;
  children: React.ReactNode;
};

export function Container({ background, padding = 0, children }: ContainerProps) {
  const editorDragAndDrop = useEditorDragAndDrop();
  return (
    <Paper ref={editorDragAndDrop} style={{ margin: '5px 0', background, padding: `${padding}px` }}>
      {children}
    </Paper>
  );
}
