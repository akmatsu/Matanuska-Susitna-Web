import { Breadcrumbs } from '@/components/client/breadcrumbs';
import clsx from 'clsx';
import React from 'react';

export function PageContainer<T extends React.ElementType>({
  breakPoint = 'md',
  ...props
}: {
  children: React.ReactNode;
  className?: string;

  /** The HTML element to render as defaults to 'div' */
  as?: T;

  /** The maximum width of the container */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

  /** The breakpoint at which the container's max-width changes */
  breakPoint?: 'sm' | 'md' | 'lg' | 'xl';

  /** Whether to hide the breadcrumbs element */
  hideBreadcrumbs?: boolean;
}) {
  const Tag = props.as || 'div';
  return (
    <Tag
      className={clsx(
        'mx-auto px-4 py-4 max-w-xl',

        breakPoint === 'sm' && {
          'sm:max-w-full': props.size === 'full',
          'sm:max-w-7xl': props.size === 'xl',
          'sm:max-w-5xl': props.size === 'lg',
          'sm:max-w-4xl': props.size === 'md',
          'sm:max-w-screen-sm': props.size === 'sm',
          'sm:max-w-xl': props.size === 'xs',
        },

        breakPoint === 'md' && {
          'md:max-w-full': props.size === 'full',
          'md:max-w-7xl': props.size === 'xl',
          'md:max-w-5xl': props.size === 'lg',
          'md:max-w-4xl': props.size === 'md',
          'md:max-w-screen-sm': props.size === 'sm',
          'md:max-w-xl': props.size === 'xs',
        },

        breakPoint === 'lg' && {
          'lg:max-w-full': props.size === 'full',
          'lg:max-w-7xl': props.size === 'xl',
          'lg:max-w-5xl': props.size === 'lg',
          'lg:max-w-4xl': props.size === 'md',
          'lg:max-w-screen-sm': props.size === 'sm',
          'lg:max-w-xl': props.size === 'xs',
        },

        breakPoint === 'xl' && {
          'xl:max-w-full': props.size === 'full',
          'xl:max-w-7xl': props.size === 'xl',
          'xl:max-w-5xl': props.size === 'lg',
          'xl:max-w-4xl': props.size === 'md',
          'xl:max-w-screen-sm': props.size === 'sm',
          'xl:max-w-xl': props.size === 'xs',
        },

        props.className,
      )}
    >
      {!props.hideBreadcrumbs && <Breadcrumbs />}

      {props.children}
    </Tag>
  );
}
