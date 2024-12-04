import { BaseComponentProps } from '../../types';

export type AlertProps = BaseComponentProps<{
  role?: 'status' | 'alert';
  status?: 'info' | 'success' | 'warning' | 'danger' | 'emergency';
  title?: string;
  message?: string;
}>;
