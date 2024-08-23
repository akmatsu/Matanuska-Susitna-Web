import { Field, Label, Switch } from '@headlessui/react';
import React, { ForwardedRef } from 'react';

export type MSwitchProps = {
  checked: boolean;
  label?: string;
  onChange: () => void;
};

/**
 * Primary switch input for setting something to true or false
 */
export const MSwitch = React.forwardRef(function MSwitch(
  props: MSwitchProps,
  forwardedRef?: ForwardedRef<HTMLButtonElement>,
) {
  return (
    <Field className="flex w-fit gap-2 items-center justify-center">
      <Switch
        ref={forwardedRef}
        checked={props.checked}
        onChange={props.onChange}
        className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-primary-default"
      >
        <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
      </Switch>
      {/* {props.label && (
        <Label className="flex items-center justify-center">
          {props.label}
        </Label>
      )} */}
    </Field>
  );
});
