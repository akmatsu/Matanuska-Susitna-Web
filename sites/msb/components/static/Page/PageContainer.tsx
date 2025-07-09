import clsx from 'clsx';
import React from 'react';

export function PageContainer<T extends React.ElementType>(props: {
  children: React.ReactNode;
  className?: string;
  as?: T;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}) {
  const Tag = props.as || 'div';
  return (
    <Tag
      className={clsx(
        'mx-auto px-4 py-16',
        {
          'max-w-full': props.size === 'xl',
          'max-w-7xl': !props.size || props.size === 'lg',
          'max-w-5xl': props.size === 'md',
          'max-w-3xl': props.size === 'sm',
          'max-w-2xl': props.size === 'xs',
        },
        props.className,
      )}
    >
      {props.children}
    </Tag>
  );
}
