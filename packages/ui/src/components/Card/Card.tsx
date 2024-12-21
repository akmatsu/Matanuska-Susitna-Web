import React from 'react';

export function Card({
  as = 'div',
  href,
  children,
  ...props
}: {
  children: React.ReactNode;
  as?: React.ElementType;
  href?: string;
}) {
  const Component = as;

  return (
    <Component href={href} {...props}>
      <div className="bg-white rounded border-2 border-base-lighter mx-2 flex flex-col gap-4 py-6 px-6">
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
    <Component href={href} {...props}>
      <LinkComponent className="rounded-t bg-base-lightest border-b-primary border-b-4 hover:bg-base-lighter cursor-pointer mx-2 transition-colors active:bg-base-light active:transition-none flex flex-col gap-4 py-6 px-6">
        {children}
      </LinkComponent>
    </Component>
  );
}
