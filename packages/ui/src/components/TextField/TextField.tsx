import { Field, Input, type InputProps, Label } from '@headlessui/react';
import clsx from 'clsx';

type TextFieldProps = {
  id: string;
  name?: string;
  placeholder?: string;
  defaultValue?: string;
  className?: string;
  label?: string;
  showLabel?: boolean;
  rounded?: boolean | 'none' | 'pill' | 'left' | 'right';
  shadow?: boolean;
  fill?: boolean;
} & InputProps;

export function TextField({
  id,
  name,
  placeholder,
  defaultValue,
  className,
  label,
  showLabel = true,
  rounded = true,
  shadow = true,
  fill = false,
  ...fieldProps
}: TextFieldProps) {
  return (
    <Field className={clsx({ 'w-full': fill })}>
      <Label
        htmlFor={id}
        className={clsx('font-semibold', { 'sr-only': !showLabel })}
      >
        {label}
      </Label>
      <Input
        className={clsx(
          'border border-base-lighter h-10 px-2 focus:outline-hidden focus:ring-4 focus:ring-blue-40v w-full',
          {
            'rounded-none': !rounded || rounded === 'none',
            rounded: rounded === true,
            'rounded-full': rounded === 'pill',
            'rounded-l': rounded === 'left',
            'rounded-r': rounded === 'right',
            'shadow-md': shadow,
          },

          className,
        )}
        id={id}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        {...fieldProps}
      />
    </Field>
  );
}
