import React, { type JSX } from 'react';
import clsx from 'clsx';
import { Slot } from 'radix-ui';

export type ButtonProps<T extends React.ElementType = 'button'> =
  React.ComponentProps<'button'> & {
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
    asChild?: boolean;
    block?: boolean;
    size?: 'xs' | 'sm' | 'md' | 'lg';
    rounded?: boolean | 'none' | 'pill' | 'left' | 'right';
    shadow?: boolean;
    icon?: boolean;
    square?: boolean;
    underline?: boolean;
    active?: boolean;
    blockOnMobile?: boolean;
    outlined?: boolean;
  } & Omit<React.ComponentPropsWithRef<T>, 'color'>;

/**
 * A customizable button component that supports multiple color variants, states, and polymorphic rendering
 * @component
 */

export function Button({
  className,
  color = 'base',
  type = 'button',
  disabled,
  asChild,
  block,
  icon,
  rounded = true,
  shadow = true,
  square = false,
  underline = false,
  active = false,
  title,
  blockOnMobile,
  size = 'md',
  outlined,
  ...props
}: ButtonProps) {
  const Component = asChild ? Slot.Root : 'button';

  return (
    <Component
      {...props}
      type={Component === 'button' ? type : undefined}
      disabled={disabled}
      aria-disabled={disabled}
      title={title || props.children?.toString()}
      aria-label={title || props.children?.toString()}
      className={clsx(
        'focus-ring flex min-w-fit items-center justify-center text-center leading-none no-underline transition-colors active:transition-none',
        {
          shadow: shadow && !outlined,
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

          // Padding and text size group
          'px-2 py-1 text-xs': size === 'xs' && !icon && !square,
          'px-3 py-1.5 text-sm': size === 'sm' && !icon && !square,
          'p-1': size === 'sm' && icon,
          'p-3': size === 'md' && icon,
          'px-5 py-3': size === 'md' && !icon && !square,
          'px-6 py-4 text-xl': size === 'lg' && !icon && !square,
          'size-10': square && size === 'md',
          'size-14': square && size === 'lg',
          'p-3 text-sm': square && size === 'sm',
          'p-2 text-xs': square && size === 'xs',
          'p-4': square && size === 'lg',
          'aspect-square p-2': size === 'md' && icon && !square,

          'font-bold': !square,
          underline: underline,
          'cursor-pointer': !disabled,

          // Disabled state
          'bg-disabled-lighter text-disabled-dark cursor-not-allowed': disabled,

          // Color variants group
          'border-base-lighter hover:border-base-light border bg-transparent text-base':
            color === 'transparent' && !disabled && !active && !outlined,
          'bg-primary hover:bg-primary-dark active:bg-primary-darker text-base-lightest':
            color === 'primary' && !disabled && !active && !outlined,
          'bg-secondary hover:bg-secondary-dark active:bg-secondary-darker text-black':
            color === 'secondary' && !disabled && !active && !outlined,
          'bg-accent-cool hover:bg-accent-cool-dark active:bg-accent-cool-darker text-black active:text-white':
            color === 'accent-cool' && !disabled && !active && !outlined,
          'bg-accent-warm hover:bg-accent-warm-dark active:bg-accent-warm-darker text-black hover:text-white active:text-white':
            color === 'accent-warm' && !disabled && !active && !outlined,
          'bg-base-dark hover:bg-base-darker active:bg-base-darkest text-white':
            color === 'base' && !disabled && !active && !outlined,
          'bg-base-lightest hover:bg-base-lighter hover:border-base-light hover:text-base-dark active:bg-base-light active:border-base border-base-lighter border text-base':
            color === 'base-light' && !disabled && !active && !outlined,
          'bg-error hover:bg-error-dark active:bg-error-darker text-white':
            color === 'error' && !disabled && !active && !outlined,
          'bg-warning hover:bg-warning-dark active:bg-warning-darker text-white':
            color === 'warning' && !disabled && !active && !outlined,
          'bg-success hover:bg-success-dark active:bg-success-darker text-white':
            color === 'success' && !disabled && !active && !outlined,
          'bg-base-darkest hover:bg-base-darker active:bg-base-dark text-white':
            color === 'black' && !disabled && !active && !outlined,

          'bg-primary active:bg-primary-darker text-base-lightest':
            color === 'primary' && !disabled && active,
          'bg-primary text-white': color === 'secondary' && !disabled && active,

          // Outlined variants
          'text-primary border-primary hover:border-primary-dark hover:text-primary-dark active:border-primary-darker active:text-primary-darker border bg-transparent':
            color === 'primary' && !disabled && !active && outlined,
        },
        className,
      )}
    >
      {props.children}
    </Component>
  );
}
