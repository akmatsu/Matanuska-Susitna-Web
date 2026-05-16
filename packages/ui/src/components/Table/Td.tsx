import { clsx } from 'clsx';
import React from 'react';

export function Td({
  children,
  className,
  ...props
}: React.ComponentProps<'td'>) {
  return (
    <td
      className={clsx('border-msb-base-lighter border px-4 py-2', className)}
      {...props}
    >
      {children}
    </td>
  );
}
