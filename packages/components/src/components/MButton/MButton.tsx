import React from 'react';

export type MButtonProps = {
  children: React.ReactNode;
};

export const MButton = ({ children }: MButtonProps) => {
  return <button style={{ border: 'none' }}>{children}</button>;
};
