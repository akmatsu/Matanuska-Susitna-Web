import { Button as HButton } from '@headlessui/react';
import clsx from 'clsx';
import { MouseEventHandler, PropsWithChildren } from 'react';

export function Button({
  children,
  onClick,
  color = 'base',
  big = false,
  disabled = false,
  outlined = false,
  unstyled = false,
}: PropsWithChildren<{
  onClick?: MouseEventHandler<HTMLButtonElement>;
  color?: 'base' | 'primary' | 'secondary' | 'primary-cool' | 'secondary-cool';
  big?: boolean;
  disabled?: boolean;
  outlined?: boolean;
  unstyled?: boolean;
}>) {
  return (
    <HButton
      className={clsx(
        'rounded font-bold leading-none  focus:outline focus:outline-4 focus:outline-offset-4 focus:outline-blue-40v disabled:bg-gray-20 disabled:text-gray-70 disabled:cursor-not-allowed',
        {
          'text-white bg-gray-50 hover:bg-gray-60 active:bg-gray-80':
            color === 'base' && !outlined,
        },
        {
          'bg-transparent text-gray-50 hover:text-gray-60 active:text-gray-80 ring-2 ring-inset ring-gray-50 hover:ring-gray-60 active:ring-gray-80':
            color === 'base' && outlined,
        },
        {
          'text-gray-90  bg-cyan-30v hover:bg-blue-cool-40v active:bg-blue-cool-60v active:text-white':
            color === 'primary-cool',
        },
        {
          'text-gray-90  bg-orange-30v hover:bg-orange-50v hover:text-white active:bg-orange-60 active:text-white':
            color === 'secondary-cool',
        },
        {
          'bg-red-50 hover:bg-red-60v active:bg-red-70v text-white':
            color === 'secondary' && !outlined,
        },
        {
          'bg-transparent text-red-50 hover:text-red-60v active:text-red-70v ring-2 ring-insert ring-red-50 hover:ring-red-70v active:ring-red-60v':
            color === 'secondary' && outlined,
        },
        {
          'bg-blue-60v hover:bg-blue-warm-70v active:bg-blue-warm-80v text-white':
            color === 'primary' && !outlined,
        },
        {
          'text-blue-60v bg-transparent hover:text-blue-warm-70v active:text-blue-warm-80v ring-2 ring-inset ring-blue-60v hover:ring-blue-warm-70v active:ring-blue-warm-80v':
            color === 'primary' && outlined,
        },
        { 'px-6 py-4': big },
        { 'px-5 py-3': !big },
      )}
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
    >
      {children}
    </HButton>
  );
}
