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
  loading?: boolean;
} & InputProps;

export function TextField({
  id,
  name,
  placeholder,
  className,
  label,
  showLabel = true,
  rounded = true,
  shadow = true,
  fill = false,
  loading,
  ...fieldProps
}: TextFieldProps) {
  return (
    <Field className={clsx('relative', { 'w-full': fill })}>
      <Label
        htmlFor={id}
        className={clsx('font-semibold', { 'sr-only': !showLabel })}
      >
        {label}
      </Label>
      <Input
        className={clsx(
          'border border-base-lighter h-10 px-2 focus-ring w-full bg-white',
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
        {...fieldProps}
      />
      {loading && (
        <div className="h-full aspect-square absolute right-0 bottom-0">
          <span className="icon-[mdi--loading] animate-spin size-full text-primary"></span>
        </div>
      )}
    </Field>
  );
}
