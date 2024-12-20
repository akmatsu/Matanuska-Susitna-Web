import React from 'react';
import clsx from 'clsx';

/**
 * A customizable button component that supports multiple color variants, states, and polymorphic rendering
 * @component
 */
export function Button<T extends React.ElementType = 'button'>({
  className,
  color = 'primary',
  type = 'button',
  disabled,
  as,
  href,
  block,
  big,
  ...props
}: {
  className?: string;
  children?: React.ReactNode;
  type?: JSX.IntrinsicElements['button']['type'];
  onClick?: JSX.IntrinsicElements['button']['onClick'];
  color?:
    | 'primary'
    | 'secondary'
    | 'accent-cool'
    | 'accent-warm'
    | 'base'
    | 'error'
    | 'warning'
    | 'success';
  disabled?: boolean;
  as?: T;
  href?: string;
  block?: boolean;
  big?: boolean;
} & Omit<React.ComponentPropsWithoutRef<T>, 'color'>) {
  const Component = as || (href ? 'a' : 'button');

  return (
    <Component
      {...props}
      href={href}
      type={Component === 'button' ? type : undefined}
      disabled={disabled}
      aria-disabled={disabled}
      className={clsx(
        'rounded leading-none font-bold focus-ring block shadow text-center',
        { 'w-fit': !block },
        { 'w-full': block },
        { 'px-5 py-3': !big },
        { 'px-6 py-4 text-xl': big },
        {
          'bg-disabled-lighter text-disabled-dark cursor-not-allowed': disabled,
        },
        {
          'bg-primary hover:bg-primary-dark active:bg-primary-darker text-white':
            color === 'primary' && !disabled,
        },
        {
          'bg-secondary hover:bg-secondary-dark active:bg-secondary-darker text-white':
            color === 'secondary' && !disabled,
        },
        {
          'bg-accent-cool hover:bg-accent-cool-dark active:bg-accent-cool-darker text-black active:text-white':
            color === 'accent-cool' && !disabled,
        },
        {
          'bg-accent-warm hover:bg-accent-warm-dark active:bg-accent-warm-darker text-black hover:text-white active:text-white':
            color === 'accent-warm' && !disabled,
        },
        {
          'bg-base hover:bg-base-dark active:bg-base-darker text-white':
            color === 'base' && !disabled,
        },
        {
          'bg-error hover:bg-error-dark active:bg-error-darker text-white':
            color === 'error' && !disabled,
        },
        {
          'bg-warning hover:bg-warning-dark active:bg-warning-darker text-white':
            color === 'warning' && !disabled,
        },
        {
          'bg-success hover:bg-success-dark active:bg-success-darker text-white':
            color === 'success' && !disabled,
        },
        className,
      )}
    >
      {props.children}
    </Component>
  );
}
