import { Field, Checkbox as HeadlessCheckbox, Label } from '@headlessui/react';
import clsx from 'clsx';

export function Checkbox({
  label,
  checked,
  onChange,
  className,
}: {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <Field className={clsx('flex items-center gap-2', className)}>
      <HeadlessCheckbox
        checked={checked}
        onChange={onChange}
        className="group border-msb-base-darkest data-checked:bg-primary focus-ring flex size-5 items-center justify-center rounded-xs border-2 bg-transparent hover:cursor-pointer"
      >
        <span className="bg-msb-base-lightest icon-[mdi--check] hidden size-4 group-data-checked:inline-block" />
      </HeadlessCheckbox>
      <Label className="hover:cursor-pointer">{label}</Label>
    </Field>
  );
}
