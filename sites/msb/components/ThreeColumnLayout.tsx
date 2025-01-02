import { ReactNode } from 'react';

export function ThreeColumnLayout(props: {
  left?: ReactNode;
  children?: ReactNode;
  right?: ReactNode;
}) {
  return (
    <div className="grid grid-cols-12 gap-8">
      <div className="col-span-3">{props.left}</div>
      <div className="col-span-6">{props.children}</div>
      <div className="col-span-3">{props.right}</div>
    </div>
  );
}
