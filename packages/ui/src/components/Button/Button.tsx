import React, { type JSX } from 'react';
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
  href,
  as,
  block,
  big,
  icon,
  rounded = true,
  shadow = true,
  square = false,
  underline = false,
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
    | 'success'
    | 'black'
    | 'transparent';
  disabled?: boolean;
  as?: T;
  href?: string;
  block?: boolean;
  big?: boolean;
  rounded?: boolean | 'none' | 'pill' | 'left' | 'right';
  shadow?: boolean;
  icon?: boolean;
  square?: boolean;
  underline?: boolean;
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
        'leading-none focus-ring text-center flex items-center justify-center no-underline transition-colors active:transition-none',
        {
          shadow,
          // Rounded corners group
          'rounded-none': !rounded || rounded === 'none',
          rounded: rounded === true,
          'rounded-full': rounded === 'pill',
          'rounded-l': rounded === 'left',
          'rounded-r': rounded === 'right',

          // Width group
          'w-fit': !block && !icon && !square,
          'w-full': block && !icon && !square,

          // Padding and text size group
          'px-5 py-3': !big && !icon && !square,
          'px-6 py-4 text-xl': big && !icon && !square,
          'size-10': square && !big,
          'p-4': square && big,
          'px-2': icon && !square,
          'font-bold': !square,
          underline: underline,

          // Disabled state
          'bg-disabled-lighter text-disabled-dark cursor-not-allowed': disabled,

          // Color variants group
          'bg-transparent text-primary border border-base-lighter hover:border-primary':
            color === 'transparent' && !disabled,
          'bg-primary hover:bg-primary-dark active:bg-primary-darker text-base-lightest':
            color === 'primary' && !disabled,
          'bg-secondary hover:bg-secondary-dark active:bg-secondary-darker text-black':
            color === 'secondary' && !disabled,
          'bg-accent-cool hover:bg-accent-cool-dark active:bg-accent-cool-darker text-black active:text-white':
            color === 'accent-cool' && !disabled,
          'bg-accent-warm hover:bg-accent-warm-dark active:bg-accent-warm-darker text-black hover:text-white active:text-white':
            color === 'accent-warm' && !disabled,
          'bg-base hover:bg-base-dark active:bg-base-darker text-white':
            color === 'base' && !disabled,
          'bg-error hover:bg-error-dark active:bg-error-darker text-white':
            color === 'error' && !disabled,
          'bg-warning hover:bg-warning-dark active:bg-warning-darker text-white':
            color === 'warning' && !disabled,
          'bg-success hover:bg-success-dark active:bg-success-darker text-white':
            color === 'success' && !disabled,
          'bg-base-darkest hover:bg-base-darker active:bg-base-dark text-white':
            color === 'black' && !disabled,
        },
        className,
      )}
    >
      {props.children}
    </Component>
  );
}
