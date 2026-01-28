import { Callout } from '@matsugov/ui';
import { BlockquoteHTMLAttributes, ClassAttributes } from 'react';
import { ExtraProps } from 'react-markdown';

export function MdCallout(
  props: ClassAttributes<HTMLQuoteElement> &
    BlockquoteHTMLAttributes<HTMLQuoteElement> &
    ExtraProps,
) {
  console.log(props.node?.properties.color);
  return (
    <Callout color={props.node?.properties.color as any}>
      {props.children}
    </Callout>
  );
}
