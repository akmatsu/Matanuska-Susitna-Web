import { Breadcrumbs } from '@/components/client/breadcrumbs';
import clsx from 'clsx';
import React from 'react';

export function PageContainer<T extends React.ElementType>(props: {
  children: React.ReactNode;
  className?: string;
  as?: T;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  breakPoint?: 'sm' | 'md' | 'lg' | 'xl';
  hideBreadcrumbs?: boolean;
  leftColumn?: React.ReactNode;
  rightColumn?: React.ReactNode;
}) {
  const Tag = props.as || 'div';
  return (
    <Tag
      className={clsx(
        'mx-auto px-4 py-4 max-w-xl w-full',
        {
          'sm:max-w-full': props.size === 'full' && props.breakPoint === 'sm',
          'sm:max-w-screen-xl':
            props.size === 'xl' && props.breakPoint === 'sm',
          'sm:max-w-screen-lg':
            props.size === 'lg' && props.breakPoint === 'sm',
          'sm:max-w-4xl': props.size === 'md' && props.breakPoint === 'sm',
          'sm:max-w-screen-sm':
            props.size === 'sm' && props.breakPoint === 'sm',
          'sm:max-w-xl': props.size === 'xs' && props.breakPoint === 'sm',
          'md:max-w-full':
            props.size === 'full' &&
            (props.breakPoint === 'md' || !props.breakPoint),
          'md:max-w-screen-xl':
            props.size === 'xl' &&
            (props.breakPoint === 'md' || !props.breakPoint),
          'md:max-w-screen-lg':
            props.size === 'lg' &&
            (props.breakPoint === 'md' || !props.breakPoint),
          'md:max-w-screen-sm':
            props.size === 'sm' &&
            (props.breakPoint === 'md' || !props.breakPoint),
          'md:max-w-xl':
            props.size === 'xs' &&
            (props.breakPoint === 'md' || !props.breakPoint),
          'lg:max-w-full': props.size === 'full' && props.breakPoint === 'lg',
          'lg:max-w-screen-xl':
            props.size === 'xl' && props.breakPoint === 'lg',
          'lg:max-w-screen-lg':
            props.size === 'lg' && props.breakPoint === 'lg',
          'lg:max-w-screen-sm':
            props.size === 'sm' && props.breakPoint === 'lg',
          'lg:max-w-xl': props.size === 'xs' && props.breakPoint === 'lg',
          'xl:max-w-full': props.size === 'full' && props.breakPoint === 'xl',
          'xl:max-w-screen-xl':
            props.size === 'xl' && props.breakPoint === 'xl',
          'xl:max-w-screen-lg':
            props.size === 'lg' && props.breakPoint === 'xl',
          'xl:max-w-screen-sm':
            props.size === 'sm' && props.breakPoint === 'xl',
          'xl:max-w-xl': props.size === 'xs' && props.breakPoint === 'xl',
        },
        props.className,
      )}
    >
      {!props.hideBreadcrumbs && <Breadcrumbs />}
      {props.children}
    </Tag>
  );
}
