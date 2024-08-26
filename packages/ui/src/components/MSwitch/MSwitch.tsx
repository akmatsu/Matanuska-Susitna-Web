import { Field, Label, Switch, type SwitchProps } from '@headlessui/react';
import { type ForwardedRef, forwardRef } from 'react';

export type MSwitchProps = SwitchProps & {
  /**
   * Add a label before the switch.
   * */
  prependLabel?: string;

  /**
   * Add a label after the switch.
   * */
  appendLabel?: string;

  /**
   * apply custom css class names to the container element. The container element is a wrapper around the switch and not the switch itself. The primary purpose of the container is to align prependLabel and appendLabel
   * */
  containerClass?: string;
};

/**
 * Primary switch input for setting something to true or false
 */
export const MSwitch = forwardRef(function MSwitch(
  { prependLabel, appendLabel, ...p }: MSwitchProps,
  forwardedRef?: ForwardedRef<HTMLButtonElement>,
) {
  return (
    <Field className="flex w-fit gap-2 items-center justify-center">
      {prependLabel && <Label className="leading-none">{prependLabel}</Label>}
      <Switch
        {...p}
        ref={forwardedRef}
        className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-primary-default"
      >
        <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
      </Switch>
      {appendLabel && <Label className="leading-none">{appendLabel}</Label>}
    </Field>
  );
});
