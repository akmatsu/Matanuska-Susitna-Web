import { Breadcrumbs } from '@/components/client/breadcrumbs';
import clsx from 'clsx';
import React from 'react';

export function PageContainer<T extends React.ElementType>(props: {
  children: React.ReactNode;
  className?: string;
  as?: T;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  hideBreadcrumbs?: boolean;
}) {
  const Tag = props.as || 'div';
  return (
    <Tag
      className={clsx(
        'mx-auto px-4 py-16',
        {
          'max-w-full': props.size === 'full',
          'max-w-screen-xl': props.size === 'xl',
          'max-w-screen-lg': !props.size || props.size === 'lg',
          'max-w-4xl': props.size === 'md',
          'max-w-screen-sm': props.size === 'sm',
          'max-w-xl': props.size === 'xs',
        },
        props.className,
      )}
    >
      {!props.hideBreadcrumbs && <Breadcrumbs />}
      {props.children}
    </Tag>
  );
}
