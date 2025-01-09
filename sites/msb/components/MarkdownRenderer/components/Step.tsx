import { ProcessListItem } from '@matsugov/ui';
import React, { ReactNode } from 'react';

export function Step({ children }: { children: ReactNode }) {
  let title = 'Step';
  let remainingChildren: ReactNode[] = [];

  React.Children.forEach(children, (child, index) => {
    if (index === 0 && React.isValidElement(child)) {
      title = (child.props as { children: string[] }).children[0] || title;
      return;
    }
    remainingChildren.push(child);
  });

  return <ProcessListItem title={title}>{remainingChildren}</ProcessListItem>;
}
