import { cn } from '@matsugov/ui/lib';
import React from 'react';

export function Field({
  children,
  ...props
}: {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="group/field" {...props}>
      {children}
    </div>
  );
}

export function FieldDescription({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      {...props}
      className={cn('invisible group-data-error/field:block', className)}
    >
      {children}
    </p>
  );
}

export function FieldLabel({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
} & React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      {...props}
      className={cn('group block text-sm font-semibold', className)}
    >
      {children}
    </label>
  );
}

export function FieldSet(props: { children: React.ReactNode }) {
  return (
    <fieldset
      className={cn(
        'border-border bg-surface mx-auto mb-16 max-w-185 border p-2 pt-0',
      )}
    >
      {props.children}
    </fieldset>
  );
}
