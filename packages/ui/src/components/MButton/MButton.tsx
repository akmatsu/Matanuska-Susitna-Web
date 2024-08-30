'use client';
import { Button } from '@trussworks/react-uswds';
import React from 'react';

export type MButtonProps = {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
};

/**
 * Primary
 */
export const MButton = React.forwardRef(function MButton(
  { type = 'button', ...p }: MButtonProps,
  forwardedRef: React.ForwardedRef<HTMLButtonElement>,
) {
  return <Button {...p} type={type} ref={forwardedRef} />;
});
