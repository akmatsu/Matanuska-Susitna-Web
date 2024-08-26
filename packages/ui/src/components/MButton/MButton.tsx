import React, { useEffect, useState } from 'react';
import { Button, type ButtonProps } from '@headlessui/react';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

export type MButtonProps = ButtonProps & {
  /** URL or relative path. Will use NextJS link component when this is provided */
  href?: string;
  /**
   * Color of the button
   */
  color?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'warning'
    | 'danger'
    | 'success';
};

/**
 * Primary
 */
export const MButton = React.forwardRef(function MButton(
  { color = 'default', className, ...p }: MButtonProps,
  forwardedRef: React.ForwardedRef<HTMLElement>,
) {
  const [bgColor, setBgColor] = useState('m-button-default');

  useEffect(() => {
    checkColor();
  }, [color]);

  const as = p.href ? Link : 'button';

  function checkColor() {
    if (color === 'primary') setBgColor('m-button-primary');
    if (color === 'secondary') setBgColor('m-button-secondary');
    if (color === 'warning') setBgColor('m-button-warning');
    if (color === 'danger') setBgColor('m-button-danger');
    if (color === 'success') setBgColor('m-button-success');
    if (!color || color === 'default') setBgColor('m-button-default');
  }

  return (
    <Button
      {...p}
      ref={forwardedRef}
      as={as}
      className={twMerge(
        `${bgColor} px-4 py-2 rounded shadow transition-colors active:transition-none`,
      )}
    />
  );
});
