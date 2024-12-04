import clsx from 'clsx';
import { CheckboxProps } from './type';
import { Field, Checkbox as HCheckbox, Label } from '@headlessui/react';

export function Checkbox(props: CheckboxProps) {
  return (
    <Field className="flex items-center gap-2">
      <HCheckbox
        onChange={props.onChange}
        checked={props.checked}
        className={clsx(
          props.className,
          'flex items-center justify-center top-0.5 shrink-0 text-transparent rounded data-[checked]:text-white border-none ring-2 ring-offset-0 data-[checked]:ring-blue-60v ring-gray-90 border-gray-90 data-[checked]:bg-blue-60v cursor-pointer disabled:cursor-not-allowed size-5',
        )}
      >
        <span className="size-5 icon-[bi--check-lg]"></span>
      </HCheckbox>
      {props.label && (
        <Label className="cursor-pointer block peer-disabled:text-gray-60 peer-disabled:cursor-not-allowed">
          {props.label}
        </Label>
      )}
    </Field>
  );
}
