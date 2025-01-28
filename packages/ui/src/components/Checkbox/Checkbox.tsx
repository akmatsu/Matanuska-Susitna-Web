import { Field, Checkbox as HeadlessCheckbox, Label } from '@headlessui/react';

export function Checkbox({
  label,
  checked,
  onChange,
  disabled,
}: {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}) {
  return (
    <Field className="flex items-center gap-2">
      <HeadlessCheckbox
        checked={checked}
        onChange={onChange}
        className="group size-5 rounded bg-transparent border-2 border-base-darkest data-[checked]:bg-primary flex items-center justify-center  hover:cursor-pointer focus-ring"
      >
        <span className="hidden size-4 bg-base-lightest iconify mdi--check group-data-[checked]:inline-block" />
      </HeadlessCheckbox>
      <Label className="hover:cursor-pointer">{label}</Label>
    </Field>
  );
}
