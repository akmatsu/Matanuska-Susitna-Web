import { BaseComponentProps } from '../../types';

export type CheckboxProps = BaseComponentProps<{
  label?: string;
  tiled?: boolean;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}>;
