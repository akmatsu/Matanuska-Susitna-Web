import clsx from 'clsx';
import { ComponentProps } from 'react';

export function FooterLink<T extends React.ElementType = React.ElementType>({
  as = 'a',
  className,
  ...props
}: {
  as?: T;
  href: string;
  children: React.ReactNode;
} & ComponentProps<T>) {
  const Link = as;
  return (
    <Link
      className={clsx(
        'text-secondary hover:text-secondary-dark transition-colors',
        className,
      )}
      {...props}
    >
      {props.children}
    </Link>
  );
}
