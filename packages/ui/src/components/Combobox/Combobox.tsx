'use client';
import {
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
  Combobox as HeadlessCombobox,
} from '@headlessui/react';
import React from 'react';

export function Combobox<T = any>(props: {
  label?: string;
  value?: T | null;
  displayValueKey: keyof T;
  descriptionKey?: keyof T;
  idKey: string;
  items?: T[];
  placeholder?: string;
  onChange?: (value?: T | null) => void;
  onChangeQuery?: React.ChangeEventHandler<HTMLInputElement>;
  onClose?: () => void;
  autoFocus?: boolean;
}) {
  const [query, setQuery] = React.useState('');

  function onChangeQuery(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
    props.onChangeQuery?.(e);
  }

  return (
    <HeadlessCombobox<T>
      value={props.value || undefined}
      onChange={props.onChange}
      onClose={props.onClose}
    >
      <ComboboxInput
        aria-label={props.label}
        displayValue={(item: any) => item?.[props.displayValueKey]}
        onChange={onChangeQuery}
        placeholder={props.placeholder}
        className="border border-base-lighter h-10 px-2 focus:outline-hidden focus:ring-4 focus:ring-blue-40v w-full rounded-xs shadow-md bg-white"
        autoFocus={props.autoFocus}
      ></ComboboxInput>
      <ComboboxOptions
        anchor="bottom"
        transition
        className="border border-base-lightest empty:invisible rounded-xs bg-white transition duration-100 data-leave:data-closed:opacity-0 w-[var(--input-width)] shadow-md z-50"
      >
        <ComboboxOption
          value={{ [props.displayValueKey]: query }}
          className="px-4 py-2 border-b border-b-base-lightest last:border-none group cursor-default select-none data-focus:bg-primary-light/10 data-[selected]:bg-light-/20"
        >
          <p className="text-sm text-base-darker">
            Search for {query}{' '}
            <span className="icon-[mdi--arrow-right] size-2"></span>
          </p>
        </ComboboxOption>
        {props.items?.map((item, index) => (
          <ComboboxOption
            key={index}
            value={item}
            className="px-4 py-2 border-b border-b-base-lightest last:border-none group cursor-default select-none data-focus:bg-primary-light/10 data-[selected]:bg-light-/20"
          >
            <h6 className="text-bold">
              {item?.[props.displayValueKey] as React.ReactNode}
            </h6>
            {props.descriptionKey && (
              <p className="text-sm text-base-darker">
                {item?.[props.descriptionKey] as React.ReactNode}
              </p>
            )}
          </ComboboxOption>
        ))}
      </ComboboxOptions>
    </HeadlessCombobox>
  );
}
