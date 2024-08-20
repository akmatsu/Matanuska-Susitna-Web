import React from 'react';

export type MButtonProps = {
  children: React.ReactNode;
};

export const MButton = ({ children }: MButtonProps) => {
  return (
    <button
      style={{ border: 'none' }}
      className="bg-primary px-4 py-2 rounded shadow-lg hover:bg-red-400 transition-colors active:bg-red-300 active:transition-none"
    >
      {children}
    </button>
  );
};
