import { MouseEventHandler } from 'react';
import { BaseComponentWithChildrenProps } from '../../types';

export type ButtonProps = BaseComponentWithChildrenProps<{
  onClick?: MouseEventHandler<HTMLButtonElement>;
  color?: 'base' | 'primary' | 'secondary' | 'primary-cool' | 'secondary-cool';
  big?: boolean;
  disabled?: boolean;
  outlined?: boolean;
  unstyled?: boolean;
  grouped?: boolean;
}>;
