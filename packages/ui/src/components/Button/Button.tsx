import { Button as HButton } from '@headlessui/react';
import clsx from 'clsx';
import { ButtonProps } from './types';

export function Button({
  children,
  onClick,
  color = 'base',
  big = false,
  disabled = false,
  outlined = false,
  unstyled = false,
  grouped = false,
  className,
}: ButtonProps) {
  return (
    <HButton
      className={clsx(className, {
        rounded: !grouped,
        'row group-first:rounded-s group-first:border-s-0 group-last:rounded-e group-last:border-e-0 group-[&:not(:first-child)]:-ms-px border-x focus:z-10':
          grouped,
        'border-gray-60 active:border-gray-80': grouped && color === 'base',
        'border-blue-warm-70v active:border-s-blue-warm-80v':
          grouped && color === 'primary',
        'border-red-60v active:border-s-red-70v':
          grouped && color === 'secondary',
        'border-orange-50v active:border-orange-60':
          grouped && color === 'secondary-cool',
        'border-blue-cool-40v active:border-blue-cool-60v':
          grouped && color === 'primary-cool',
        'underline leading-none text-blue-60v bg-transparent hover:text-blue-warm-70v active:text-blue-warm-80v focus:outline focus:outline-4 focus:outline-offset-4 focus:outline-blue-40v disabled:ring-gray-40 disabled:text-gray-40 disabled:cursor-not-allowed':
          unstyled,
        'font-bold leading-none  focus:outline focus:outline-4 focus:outline-offset-4 focus:outline-blue-40v disabled:bg-gray-20 disabled:text-gray-70 disabled:cursor-not-allowed':
          !unstyled,
        'text-xl': unstyled && big,
        'text-white bg-gray-50 hover:bg-gray-60 active:bg-gray-80':
          color === 'base' && !outlined && !unstyled,
        'bg-transparent text-gray-50 hover:text-gray-60 active:text-gray-80 ring-2 ring-inset ring-gray-50 hover:ring-gray-60 active:ring-gray-80':
          color === 'base' && outlined && !unstyled,
        'text-gray-90  bg-cyan-30v hover:bg-blue-cool-40v active:bg-blue-cool-60v active:text-white':
          color === 'primary-cool' && !unstyled,
        'text-gray-90  bg-orange-30v hover:bg-orange-50v hover:text-white active:bg-orange-60 active:text-white':
          color === 'secondary-cool' && !unstyled,
        'bg-red-50 hover:bg-red-60v active:bg-red-70v text-white':
          color === 'secondary' && !outlined && !unstyled,
        'bg-transparent text-red-50 hover:text-red-60v active:text-red-70v ring-2 ring-insert ring-red-50 hover:ring-red-70v active:ring-red-60v':
          color === 'secondary' && outlined && !unstyled,
        'bg-blue-60v hover:bg-blue-warm-70v active:bg-blue-warm-80v text-white':
          color === 'primary' && !outlined && !unstyled,
        'text-blue-60v bg-transparent hover:text-blue-warm-70v active:text-blue-warm-80v ring-2 ring-inset ring-blue-60v hover:ring-blue-warm-70v active:ring-blue-warm-80v':
          color === 'primary' && outlined && !unstyled,
        'px-6 py-4': big && !unstyled,
        'px-5 py-3': !big && !unstyled,
      })}
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
    >
      {children}
    </HButton>
  );
}
