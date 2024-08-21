import React from 'react';
import { Button } from '@headlessui/react';

export type MButtonProps = {
  children?: React.ReactNode;
};

/**
 * Primary
 */
export const MButton = ({ children }: MButtonProps) => {
  return (
    <Button className="bg-primary-default px-4 py-2 rounded shadow-lg hover:bg-primary-hover transition-colors active:bg-primary-active active:transition-none text-white">
      {children}
    </Button>
  );
};
