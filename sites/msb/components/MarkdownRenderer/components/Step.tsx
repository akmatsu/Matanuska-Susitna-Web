import React, { PropsWithChildren, ReactElement, ReactNode } from 'react';

export function Step({ children }: { children: ReactNode }) {
  const modifiedChildren = React.Children.map(children, (child, index) => {
    if (index === 0 && React.isValidElement(child)) {
      return React.cloneElement<HTMLElement>(child as ReactElement, {
        className: `${child.props.className || ''} usa-process-list__heading`,
      });
    }
    return child;
  });
  return <li className="usa-process-list__item">{modifiedChildren}</li>;
}
