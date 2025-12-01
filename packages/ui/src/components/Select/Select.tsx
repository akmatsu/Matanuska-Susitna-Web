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
      {label && <Label className="font-semibold block">{label}</Label>}
      <HSelect
        {...props}
        name={name || label}
        aria-label={ariaLabel || name || label}
        className={clsx(
          'focus-ring border border-base-lighter h-10 px-2 rounded shadow-md bg-white cursor-pointer',
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
