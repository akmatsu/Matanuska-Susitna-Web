import React from 'react';
import clsx from 'clsx';

export function Button({
  className,
  color = 'base',
  type = 'button',
  disabled,
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
}) {
  return (
    <button
      {...props}
      disabled={disabled}
      aria-disabled={disabled}
      className={clsx(
        'rounded px-5 py-3 leading-none font-bold focus-ring',
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
    ></button>
  );
}
