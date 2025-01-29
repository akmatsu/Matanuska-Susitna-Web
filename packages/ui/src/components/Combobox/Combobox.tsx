import {
  ComboboxInput,
  ComboboxOptions,
  Combobox as HeadlessCombobox,
} from '@headlessui/react';

export function Combobox<T = any>(props: {
  label?: string;
  value?: T | null;
  displayValueKey: keyof T;
  idKey: string;
  items?: T[];
  placeholder?: string;
  onChange?: (value?: T | null) => void;
  onChangeQuery?: React.ChangeEventHandler<HTMLInputElement>;
  onClose?: () => void;
}) {
  return (
    <HeadlessCombobox<T>
      value={props.value || undefined}
      onChange={props.onChange}
      onClose={props.onClose}
    >
      <div className="relative">
        <ComboboxInput
          aria-label={props.label}
          displayValue={(item: any) => item?.[props.displayValueKey]}
          onChange={props.onChangeQuery}
          placeholder={props.placeholder}
          className="border border-base-lighter h-10 px-2 focus:outline-none focus:ring-4 focus:ring-blue-40v w-full rounded shadow-md"
        ></ComboboxInput>
        <ComboboxOptions
          anchor="bottom"
          transition
          className="border border-base-lightest empty:invisible rounded bg-white transition duration-100 data-[leave]:data-[closed]:opacity-0 w-[var(--input-width)] shadow-md"
        >
          {props.items?.map((item, index) => (
            <li key={index}>
              {item?.[props.displayValueKey as keyof T] as React.ReactNode}
            </li>
          ))}
        </ComboboxOptions>
      </div>
    </HeadlessCombobox>
  );
}
