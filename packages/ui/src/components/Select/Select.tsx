import {
  Field,
  Select as HSelect,
  Label,
  SelectProps,
} from '@headlessui/react';
import clsx from 'clsx';

export function Select({
  options,
  name,
  'aria-label': ariaLabel,
  className,
  label,
  ...props
}: {
  options: Array<{ label: string; value: string }> | Array<string>;
  name?: string;
  'aria-label'?: string;
  className?: string;
  label?: string;
  description?: string;
} & SelectProps) {
  return (
    <Field className={clsx('relative')}>
      {label && <Label className="block font-semibold">{label}</Label>}
      <HSelect
        {...props}
        name={name || label}
        aria-label={ariaLabel || name || label}
        className={clsx(
          'focus-ring border-msb-base-lighter h-10 cursor-pointer rounded border bg-white px-2 shadow-md',
          className,
        )}
      >
        {options.map((option) =>
          typeof option === 'string' ? (
            <option key={option} value={option}>
              {option}
            </option>
          ) : (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ),
        )}
      </HSelect>
    </Field>
  );
}
