import React, { ReactElement } from 'react';
import { ButtonGroupProps } from './types';
import { Button } from '../Button/Button';
import { L } from 'vitest/dist/chunks/reporters.DAfKSDh5.js';
import clsx from 'clsx';

export function ButtonGroup({
  children,
  className,
  color = 'base',
  big = false,
  outlined = false,
  segmented = false,
}: ButtonGroupProps) {
  return (
    <div
      className={clsx(`${className} @container`, {
        'space-y-4': segmented,
      })}
    >
      <ul
        className={clsx('flex flex-col @mobile-lg:flex-row', {
          'gap-2': !segmented,
        })}
      >
        {React.Children.map(children, (child) =>
          React.isValidElement(child) ? (
            <li
              className={clsx('flex', {
                'grow @tablet:grow-0 group': segmented,
              })}
            >
              {React.cloneElement(child as ReactElement, {
                color,
                big,
                outlined,
                grouped: segmented,
              })}
            </li>
          ) : (
            <li className="flex">muffins</li>
          ),
        )}
      </ul>
    </div>
  );
}
