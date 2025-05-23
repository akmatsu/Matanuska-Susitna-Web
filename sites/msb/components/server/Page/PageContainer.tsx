import clsx from 'clsx';
import React from 'react';

export function PageContainer<T extends React.ElementType>(props: {
  children: React.ReactNode;
  className?: string;
  as?: T;
}) {
  const Tag = props.as || 'div';
  return (
    <Tag className={clsx('max-w-7xl mx-auto px-4 py-16', props.className)}>
      {props.children}
    </Tag>
  );
}
