import { BaseComponentWithChildrenProps } from '../../types';

export type AccordionProps = BaseComponentWithChildrenProps;

export type AccordionItemProps = BaseComponentWithChildrenProps<{
  title?: string;
}>;
