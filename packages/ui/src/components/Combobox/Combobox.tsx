'use client';
import {
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
  Combobox as HeadlessCombobox,
} from '@headlessui/react';
import React, { Key } from 'react';

export function Combobox<T = any>(props: {
  label?: string;
  value?: T | null;
  displayValueKey: keyof T;
  descriptionKey?: keyof T;
  displayTypeKey?: keyof T;
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
        className="border-msb-base-lighter focus:ring-primary h-10 w-full rounded-xs border bg-white px-2 shadow-md focus:ring-4 focus:outline-hidden"
        autoFocus={props.autoFocus}
      ></ComboboxInput>
      <ComboboxOptions
        anchor="bottom"
        transition
        className="border-msb-base-lightest z-50 w-(--input-width) rounded-xs border bg-white shadow-md transition duration-100 empty:invisible data-leave:data-closed:opacity-0"
      >
        <ComboboxOption
          value={{ [props.displayValueKey]: query }}
          className="border-b-base-lightest group data-focus:bg-primary-light/10 data-selected:bg-light-/20 cursor-default border-b px-4 py-2 select-none last:border-none"
        >
          <p className="text-msb-base-darker text-sm">
            Search for {query}{' '}
            <span className="icon-[mdi--arrow-right] size-2"></span>
          </p>
        </ComboboxOption>
        {props.items?.map((item, index) => (
          <ComboboxOption
            key={(item?.[props.idKey as keyof typeof item] as Key) || index}
            value={item}
            className="border-b-base-lightest group data-focus:bg-primary-light/10 data-selected:bg-light-/20 cursor-default border-b px-4 py-2 select-none last:border-none"
          >
            <p>{item?.[props.displayValueKey] as React.ReactNode} </p>
          </ComboboxOption>
        ))}
      </ComboboxOptions>
    </HeadlessCombobox>
  );
}
