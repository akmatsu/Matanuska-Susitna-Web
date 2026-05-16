import clsx from 'clsx';
import React from 'react';

export type CardProps<T extends React.ElementType = 'div'> = {
  children: React.ReactNode;
  as?: T;
  className?: string;
  containerClassName?: string;
  dark?: boolean;
} & React.ComponentProps<T>;

export function Card<T extends React.ElementType = 'div'>({
  as = 'div',
  children,
  className,
  containerClassName,
  dark,
  ...props
}: CardProps<T>) {
  const Component = as;

  return (
    <Component {...props} className={containerClassName}>
      <div
        className={clsx(
          'flex flex-col gap-4 rounded shadow-md',
          {
            'border-msb-base-lighter border bg-white': !dark,
            'bg-surface-primary border-msb-base-darkest border text-white':
              dark,
          },
          className,
        )}
      >
        {children}
      </div>
    </Component>
  );
}

export function LinkCard<T extends React.ElementType = 'div'>({
  as = 'div',
  linkAs = 'a',
  href,
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  href: string;
  as?: T;
  linkAs?: React.ElementType;
  className?: string;
} & React.ComponentProps<T>) {
  const Component = as;
  const LinkComponent = linkAs;

  return (
    <Component {...props} className={className}>
      <LinkComponent
        href={href}
        className={clsx(
          'bg-msb-base-lightest border-b-primary hover:bg-msb-base-lighter hover:border-b-primary-dark active:bg-msb-base-light border-msb-base-lighter flex cursor-pointer flex-col gap-4 overflow-hidden rounded-t border border-b-4 text-black no-underline shadow-md transition-colors active:transition-none',
          className,
        )}
      >
        {children}
      </LinkComponent>
    </Component>
  );
}

export function CardMedia({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}

export function CardTitle<T extends React.ElementType = 'h4'>({
  children,
  as = 'h4',
  className,
  titleSize = 'lg',
  id,
}: {
  children: React.ReactNode;
  as?: T;
  className?: string;
  id?: string;
  /**
   * Size of the title text.
   * @default 'lg' */
  titleSize?: 'sm' | 'md' | 'lg';
} & React.ComponentProps<T>) {
  const Component = as;
  return (
    <Component
      id={id}
      className={clsx(
        'leading-none font-bold',
        {
          'text-sm': titleSize === 'sm',
          'text-lg': titleSize === 'md',
          'text-xl': titleSize === 'lg',
        },
        className,
      )}
    >
      {children}
    </Component>
  );
}

export function CardHeader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx('px-6 first:pt-6 last:pb-6', className)}>
      {children}
    </div>
  );
}

export function CardBody({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx('px-6 first:pt-6 last:pb-6', className)}>
      {children}
    </div>
  );
}

export function CardFooter({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx('flex gap-2 px-6 first:pt-6 last:pb-6', className)}>
      {children}
    </div>
  );
}
