import clsx from 'clsx';
import React from 'react';

export type SurfaceProps<T extends React.ElementType = 'div'> = {
  children: React.ReactNode;
  as?: T;
  className?: string;
} & React.ComponentProps<T>;

export function Surface<T extends React.ElementType = 'div'>({
  as,
  children,
  className,
  ...props
}: SurfaceProps<T>) {
  const Tag = as || 'div';
  const isClickable =
    props.href ||
    props.onClick ||
    props.role === 'button' ||
    props.tabIndex !== undefined;
  return (
    <Tag
      className={clsx(
        'bg-white border border-base-light text-black no-underline rounded overflow-hidden',
        {
          'group hover:border-base transition-colors cursor-pointer hover:bg-base-lightest':
            isClickable,
        },
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

export function SurfaceIconWrapper(props: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        'p-4',
        'bg-base-lightest group-hover:bg-base-lighter transition-colors',
        'h-fit sm:h-auto sm:min-h-full',
        'w-full sm:w-fit',
        'flex justify-center items-center',
        props.className,
      )}
    >
      {props.children}
    </div>
  );
}
