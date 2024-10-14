import { HTMLAttributes } from 'react';

export type ServiceSearchProps = {
  search?: string | null;
  className?: HTMLAttributes<HTMLDivElement>['className'];
};
