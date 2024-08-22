import React from 'react';
import { twMerge } from 'tailwind-merge';

export type MCardProps = {
  title?: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  children?: string | React.ReactNode;
  className?: string;
};

export const MCard = React.forwardRef(function MCard(
  props: MCardProps,
  ref: React.ForwardedRef<any>,
) {
  return (
    <div
      ref={ref}
      className={twMerge('bg-white rounded shadow', props.className)}
    >
      {props.title && <h3 className=" capitalize px-4  pt-4">{props.title}</h3>}

      {props.subtitle && typeof props.subtitle === 'string' ? (
        <h5 className="capitalize px-4">{props.subtitle}</h5>
      ) : (
        props.subtitle
      )}

      {props.children && typeof props.children === 'string' ? (
        <p className="px-4 pb-4">{props.children}</p>
      ) : (
        props.children
      )}
    </div>
  );
});
