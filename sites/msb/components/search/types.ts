import { HTMLAttributes } from 'react';

export type SearchListInputProps = {
  search?: string | null;
  className?: HTMLAttributes<HTMLDivElement>['className'];
};
