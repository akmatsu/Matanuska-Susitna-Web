import clsx from 'clsx';
import React from 'react';

export function Card({
  as = 'div',
  children,
  className,
  titleAs = 'h4',
  ...props
}: {
  children: React.ReactNode;
  as?: React.ElementType;
  className?: string;
  titleAs?: React.ElementType;
}) {
  const Component = as;

  return (
    <Component {...props}>
      <div
        className={clsx(
          'bg-white rounded-xs border border-base-lighter flex flex-col gap-4 shadow-md',
          className,
        )}
      >
        {children}
      </div>
    </Component>
  );
}

export function LinkCard({
  as = 'div',
  linkAs = 'a',
  href,
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  href: string;
  as?: React.ElementType;
  linkAs?: React.ElementType;
  className?: string;
}) {
  const Component = as;
  const LinkComponent = linkAs;

  return (
    <Component {...props} className={className}>
      <LinkComponent
        href={href}
        className={clsx(
          'text-black overflow-hidden no-underline rounded-t bg-base-lightest border-b-primary border-b-4 hover:bg-base-lighter cursor-pointer transition-colors active:bg-base-light active:transition-none flex flex-col gap-4 shadow-md border border-base-lighter',
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

export function CardTitle({
  children,
  as = 'h4',
  className,
}: {
  children: React.ReactNode;
  as?: React.ElementType;
  className?: string;
}) {
  const Component = as;
  return (
    <Component className={clsx('text-xl font-bold leading-none', className)}>
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
    <div
      className={clsx(
        'px-6 last:pb-6 flex flex-row gap-2 first:pt-6',
        className,
      )}
    >
      {children}
    </div>
  );
}
