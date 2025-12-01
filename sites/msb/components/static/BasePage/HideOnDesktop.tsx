import clsx from 'clsx';
import { ReactNode } from 'react';

export function HideOnDesktop(props: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx('lg:hidden', props.className)}>{props.children}</div>
  );
}
