import { BaseComponentWithChildrenProps } from '../../types';

export type ButtonGroupProps = BaseComponentWithChildrenProps<{
  color?: 'base' | 'primary' | 'secondary' | 'primary-cool' | 'secondary-cool';
  big?: boolean;
  outlined?: boolean;
  segmented?: boolean;
}>;
