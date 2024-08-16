'use client';
import React from 'react';
import { Button, type ButtonOwnProps } from '@mui/material';
import { useEditorDragAndDrop } from '@/hooks/useEditorDragAndDrop';

export type ButtonProps = {
  size: ButtonOwnProps['size'];
  variant: ButtonOwnProps['variant'];
  color: ButtonOwnProps['color'];
  children: React.ReactNode;
};

export function Btn({ size, variant, color, children }: ButtonProps) {
  const editorDragAndDrop = useEditorDragAndDrop();
  return (
    <Button size={size} variant={variant} color={color} ref={editorDragAndDrop}>
      {children}
    </Button>
  );
}
