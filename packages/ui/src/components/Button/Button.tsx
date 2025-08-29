import React, { type JSX } from 'react';
import clsx from 'clsx';

export type ButtonProps<T extends React.ElementType = 'button'> = {
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
    | 'base-light'
    | 'error'
    | 'warning'
    | 'success'
    | 'black'
    | 'transparent';
  disabled?: boolean;
  as?: T;
  href?: string;
  block?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  rounded?: boolean | 'none' | 'pill' | 'left' | 'right';
  shadow?: boolean;
  icon?: boolean;
  square?: boolean;
  underline?: boolean;
  active?: boolean;
  blockOnMobile?: boolean;
} & Omit<React.ComponentPropsWithRef<T>, 'color'>;

/**
 * A customizable button component that supports multiple color variants, states, and polymorphic rendering
 * @component
 */

export function Button<T extends React.ElementType = 'button'>({
  className,
  color = 'base',
  type = 'button',
  disabled,
  href,
  as,
  block,
  icon,
  rounded = true,
  shadow = true,
  square = false,
  underline = false,
  active = false,
  title,
  ariaLabel,
  blockOnMobile,
  size = 'md',
  ...props
}: ButtonProps<T>) {
  const Component = as || (href ? 'a' : 'button');

  return (
    <Component
      {...props}
      href={href}
      type={Component === 'button' ? type : undefined}
      disabled={disabled}
      aria-disabled={disabled}
      title={title || props.children?.toString()}
      aria-label={ariaLabel || title || props.children?.toString()}
      className={clsx(
        'leading-none focus-ring text-center flex items-center justify-center no-underline transition-colors active:transition-none min-w-fit',
        {
          shadow,
          // Rounded corners group
          'rounded-none': !rounded || rounded === 'none',
          rounded: rounded === true,
          'rounded-full': rounded === 'pill',
          'rounded-l': rounded === 'left',
          'rounded-r': rounded === 'right',

          // Width group
          'w-fit': !block && !blockOnMobile && !icon && !square,
          'sm:w-fit': blockOnMobile,
          'w-full': (blockOnMobile || block) && !icon && !square,

          'px-2 py-1 text-xs': size === 'xs' && !icon && !square,
          'px-3 py-1.5 text-sm': size === 'sm' && !icon && !square,

          // Padding and text size group
          'px-5 py-3': size === 'md' && !icon && !square,
          'px-6 py-4 text-xl': size === 'lg' && !icon && !square,
          'size-10': square && size === 'md',
          'p-4': square && size === 'lg',
          'p-2 aspect-square': size === 'md' && icon && !square,

          'font-bold': !square,
          underline: underline,
          'cursor-pointer': !disabled,

          // Disabled state
          'bg-disabled-lighter text-disabled-dark cursor-not-allowed': disabled,

          // Color variants group
          'bg-transparent text-base border border-base-lighter hover:border-base-light':
            color === 'transparent' && !disabled && !active,
          'bg-primary hover:bg-primary-dark active:bg-primary-darker text-base-lightest':
            color === 'primary' && !disabled && !active,
          'bg-secondary hover:bg-secondary-dark active:bg-secondary-darker text-black':
            color === 'secondary' && !disabled && !active,
          'bg-accent-cool hover:bg-accent-cool-dark active:bg-accent-cool-darker text-black active:text-white':
            color === 'accent-cool' && !disabled && !active,
          'bg-accent-warm hover:bg-accent-warm-dark active:bg-accent-warm-darker text-black hover:text-white active:text-white':
            color === 'accent-warm' && !disabled && !active,
          'bg-base hover:bg-base-dark active:bg-base-darker text-white':
            color === 'base' && !disabled && !active,
          'bg-base-lightest hover:bg-base-lighter hover:border-base-light hover:text-base-dark active:bg-base-light active:border-base text-base border border-base-lighter':
            color === 'base-light' && !disabled && !active,
          'bg-error hover:bg-error-dark active:bg-error-darker text-white':
            color === 'error' && !disabled && !active,
          'bg-warning hover:bg-warning-dark active:bg-warning-darker text-white':
            color === 'warning' && !disabled && !active,
          'bg-success hover:bg-success-dark active:bg-success-darker text-white':
            color === 'success' && !disabled && !active,
          'bg-base-darkest hover:bg-base-darker active:bg-base-dark text-white':
            color === 'black' && !disabled && !active,

          'bg-primary  active:bg-primary-darker text-base-lightest':
            color === 'primary' && !disabled && active,
          'bg-primary text-white': color === 'secondary' && !disabled && active,
        },
        className,
      )}
    >
      {props.children}
    </Component>
  );
}
