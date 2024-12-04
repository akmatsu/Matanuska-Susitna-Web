import { PropsWithChildren } from 'react';

export type BaseComponentProps<T = unknown> = T & {
  className?: string;
};

export type BaseComponentWithChildrenProps<T = unknown> = PropsWithChildren<
  BaseComponentProps<T>
>;

export type HeaderTags = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type Colors =
  | 'base'
  | 'primary'
  | 'secondary'
  | 'primary-cool'
  | 'secondary-cool';
