import clsx from 'clsx';
import React from 'react';

export function PageContainer<T extends React.ElementType>({
  size,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  as?: T;

  /** This is ignored if left or right are provided */
  size?: 'sm' | 'md' | 'lg' | 'full';
}) {
  const Tag = props.as || 'div';

  return (
    <Tag
      className={clsx('mx-auto px-4 py-4 w-full', {
        'max-w-3xl': size === 'sm',
        'max-w-4xl': size === 'md' || !size,
        'max-w-5xl': size === 'lg',
        'max-w-full': size === 'full',
      })}
    >
      <div className={clsx('flex flex-col gap-8 w-full')}>{props.children}</div>
    </Tag>
  );
}
