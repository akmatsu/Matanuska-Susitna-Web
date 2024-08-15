import React from 'react';
import { Button, type ButtonOwnProps } from '@mui/material';

export type ButtonProps = {
  size: ButtonOwnProps['size'];
  variant: ButtonOwnProps['variant'];
  color: ButtonOwnProps['color'];
  children: React.ReactNode;
};

export function Btn({ size, variant, color, children }: ButtonProps) {
  return (
    <Button size={size} variant={variant} color={color}>
      {children}
    </Button>
  );
}
