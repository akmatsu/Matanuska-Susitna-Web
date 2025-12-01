import { clsx } from 'clsx';
import React from 'react';

export function Td({
  children,
  className,
  ...props
}: React.ComponentProps<'td'>) {
  return (
    <td
      className={clsx('border border-base-lighter px-4 py-2', className)}
      {...props}
    >
      {children}
    </td>
  );
}
