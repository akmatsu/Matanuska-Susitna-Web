import React, { useEffect, useState } from 'react';
import { Button } from '@headlessui/react';
import Link, { LinkProps } from 'next/link';

export type MButtonProps = {
  children?: React.ReactNode;
  href?: string;
  className?: string;
  /**
   * @default 'default'
   */
  color?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'warning'
    | 'danger'
    | 'success';
  onClick?:
    | React.MouseEventHandler<HTMLButtonElement>
    | React.MouseEventHandler<HTMLAnchorElement>;
};

/**
 * Primary
 */
export const MButton = React.forwardRef(function MButton(
  props: MButtonProps,
  forwardedRef: React.ForwardedRef<HTMLElement>,
) {
  const [bgColor, setBgColor] = useState(
    'bg-white hover:bg-gray-50 active:bg-gray-100 text-black',
  );

  useEffect(() => {
    checkColor();
  });

  const as = props.href ? Link : 'button';

  function checkColor() {
    switch (props.color) {
      default:
        setBgColor(
          'bg-surface-default hover:bg-surface-hover active:bg-surface-active text-surface-on',
        );
        break;
      case 'default':
        setBgColor(
          'bg-surface-default hover:bg-surface-hover active:bg-surface-100 text-surface-on',
        );
        break;
      case 'secondary':
        setBgColor(
          'bg-secondary-default hover:bg-secondary-hover active:bg-secondary-active text-secondary-on',
        );
        break;
      case 'primary':
        setBgColor(
          'bg-primary-default hover:bg-primary-hover active:bg-primary-active text-primary-on',
        );
        break;
      case 'warning':
        setBgColor(
          'bg-warning-default hover:bg-warning-hover active:bg-primary-active text-warning-on',
        );
        break;
      case 'danger':
        setBgColor(
          'bg-danger-default hover:bg-danger-hover active:bg-danger-active text-danger-on',
        );
        break;
      case 'success':
        setBgColor(
          'bg-success-default hover:bg-success-hover active:bg-success-active text-success-on',
        );
        break;
    }
  }

  return (
    <Button
      ref={forwardedRef}
      as={as}
      href={props.href}
      className={`${bgColor} px-4 py-2 rounded shadow transition-colors active:transition-none`}
      onClick={props.onClick}
    >
      {props.children}
    </Button>
  );
});
