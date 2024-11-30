import { ImgHTMLAttributes } from 'react';
import {
  BaseComponentProps,
  BaseComponentWithChildrenProps,
  HeaderTags,
} from '../../types';

export type CardProps = BaseComponentWithChildrenProps;

export type CardHeaderProps = BaseComponentWithChildrenProps<{
  tag?: HeaderTags | 'p';
}>;

export type CardBodyProps = BaseComponentWithChildrenProps;

export type CardMediaProps = BaseComponentProps<{
  src: ImgHTMLAttributes<HTMLImageElement>['src'];
}>;

export type CardFooterProps = BaseComponentWithChildrenProps;
