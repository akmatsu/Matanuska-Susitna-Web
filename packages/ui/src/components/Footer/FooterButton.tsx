import clsx from 'clsx';
import { ComponentProps, ReactNode } from 'react';

export function FooterButton<T extends React.ElementType = 'button'>({
  as = 'button',
  className,
  ...props
}: {
  as?: T;
  children: ReactNode;
} & ComponentProps<T>) {
  const Button = as;
  return (
    <Button
      className={clsx(
        'text-secondary hover:text-secondary-dark w-fit cursor-pointer text-left underline transition-colors',
        className,
      )}
      {...props}
    >
      {props.children}
    </Button>
  );
}
