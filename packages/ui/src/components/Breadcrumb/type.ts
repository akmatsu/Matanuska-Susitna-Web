import { ReactNode } from 'react';
import { BaseComponentProps } from '../../types';

export type BreadcrumbProps = BaseComponentProps<{
  items: {
    url: string;
    label: string;
  }[];
  LinkComponent?:
    | React.ComponentType<{ href: string; children: ReactNode }>
    | React.ElementType<{ href: string; children: ReactNode }>;
}>;
