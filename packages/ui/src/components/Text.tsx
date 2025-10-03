import clsx from 'clsx';
import { JSX } from 'react';

export type TextColor =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'dark'
  | 'light';

export type TextType =
  | 'body'
  | 'body-sm'
  | 'heading1'
  | 'heading2'
  | 'heading3'
  | 'subtitle'
  | 'label';

export interface TextProps {
  children?: React.ReactNode;
  type?: TextType;
  color?: TextColor;
  className?: string;
  noMargins?: boolean;
}

export function Text({
  type = 'body',
  color = 'default',
  ...props
}: TextProps) {
  const Tag = getType(type);
  return (
    <Tag
      className={clsx(
        {
          'text-white': color === 'light',
          'text-black': color === 'dark',
          'text-primary': color === 'primary',
          'text-secondary': color === 'secondary',
          'text-accent-warm': color === 'accent',
          'text-4xl font-bold': type === 'heading1',
          'text-2xl font-bold': type === 'heading2',
          'text-sm': type === 'body-sm',
          'text-xl font-semibold': type === 'heading3',
          'mb-4':
            !props.noMargins && (type === 'heading1' || type === 'heading2'),
          'mb-3': !props.noMargins && type === 'heading3',
        },
        props.className,
      )}
    >
      {props.children}
    </Tag>
  );
}

function getType(type: TextType): keyof JSX.IntrinsicElements {
  switch (type) {
    case 'heading1':
      return 'h1';
    case 'heading2':
      return 'h2';
    case 'heading3':
      return 'h3';
    case 'label':
      return 'p';
    case 'subtitle':
      return 'h2';
    default:
      return 'p';
  }
}
