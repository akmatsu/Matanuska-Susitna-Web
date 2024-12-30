import React from 'react';

export function Card({
  as = 'div',
  children,
  titleAs = 'h4',
  ...props
}: {
  children: React.ReactNode;
  as?: React.ElementType;

  titleAs?: React.ElementType;
}) {
  const Component = as;

  return (
    <Component {...props}>
      <div className="bg-white rounded border-2 border-base-lighter flex flex-col gap-4">
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

  ...props
}: {
  children: React.ReactNode;
  href: string;
  as?: React.ElementType;
  linkAs?: React.ElementType;
}) {
  const Component = as;
  const LinkComponent = linkAs;

  return (
    <Component {...props}>
      <LinkComponent
        href={href}
        className="text-black overflow-hidden no-underline rounded-t bg-base-lightest border-b-primary border-b-4 hover:bg-base-lighter cursor-pointer transition-colors active:bg-base-light active:transition-none flex flex-col gap-4"
      >
        {children}
      </LinkComponent>
    </Component>
  );
}

export function CardMedia({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

export function CardTitle({
  children,
  as = 'h4',
}: {
  children: React.ReactNode;
  as?: React.ElementType;
}) {
  const Component = as;
  return (
    <Component className="text-xl font-bold leading-none">{children}</Component>
  );
}

export function CardHeader({ children }: { children: React.ReactNode }) {
  return <div className="px-6 first:pt-6 last:pb-6">{children}</div>;
}

export function CardBody({ children }: { children: React.ReactNode }) {
  return <div className="px-6 first:pt-6 last:pb-6">{children}</div>;
}

export function CardFooter({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-6 last:pb-6 flex flex-row gap-2 first:pt-6">
      {children}
    </div>
  );
}
