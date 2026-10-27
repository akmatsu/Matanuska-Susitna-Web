'use client';
import * as React from 'react';
import { DayPicker, getDefaultClassNames } from 'react-day-picker';
import { cn } from '../../lib/utils';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

/**
 * A styled wrapper around react-day-picker's `DayPicker`. Accepts every
 * `DayPicker` prop, so it supports single, multiple, and range selection.
 */
export function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  components,
  ...props
}: CalendarProps) {
  // Keep the library's default class names so its built-in behavior
  // (like hiding the native dropdown select) still has hooks to target.
  const defaults = getDefaultClassNames();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-1', className)}
      classNames={{
        root: cn('w-fit', defaults.root),
        months: cn('relative flex flex-col gap-4 sm:flex-row', defaults.months),
        month: cn('flex w-full flex-col gap-3', defaults.month),
        nav: cn(
          'absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1',
          defaults.nav,
        ),
        button_previous: cn(
          'focus-ring hover:bg-msb-base-lightest flex size-9 cursor-pointer items-center justify-center rounded disabled:cursor-not-allowed disabled:opacity-50',
          defaults.button_previous,
        ),
        button_next: cn(
          'focus-ring hover:bg-msb-base-lightest flex size-9 cursor-pointer items-center justify-center rounded disabled:cursor-not-allowed disabled:opacity-50',
          defaults.button_next,
        ),
        month_caption: cn(
          'flex h-9 w-full items-center justify-center px-9',
          defaults.month_caption,
        ),
        dropdowns: cn(
          'flex h-9 w-full items-center justify-center gap-1.5 font-semibold',
          defaults.dropdowns,
        ),
        dropdown_root: cn(
          'border-msb-base-lighter has-focus:ring-primary relative rounded border has-focus:ring-2',
          defaults.dropdown_root,
        ),
        dropdown: cn(
          'absolute inset-0 cursor-pointer opacity-0',
          defaults.dropdown,
        ),
        caption_label: cn(
          'flex items-center gap-1 font-semibold select-none',
          props.captionLayout?.startsWith('dropdown') && 'h-8 pr-1 pl-2',
          defaults.caption_label,
        ),
        month_grid: cn('w-full border-collapse', defaults.month_grid),
        weekdays: cn('flex', defaults.weekdays),
        weekday: cn(
          'text-msb-base-dark flex-1 text-sm font-normal select-none',
          defaults.weekday,
        ),
        week: cn('mt-1 flex w-full', defaults.week),
        day: cn(
          'group/day relative aspect-square size-10 p-0 text-center select-none',
          defaults.day,
        ),
        day_button: cn(
          'focus-ring hover:bg-msb-base-lightest group-data-[selected=true]/day:hover:bg-primary-dark flex size-full cursor-pointer items-center justify-center rounded disabled:cursor-not-allowed',
          defaults.day_button,
        ),
        range_start: cn(
          'bg-primary rounded-l text-white [&>button]:hover:bg-primary-dark',
          defaults.range_start,
        ),
        range_middle: cn(
          'bg-primary-lighter text-msb-base-darkest rounded-none [&>button]:rounded-none [&>button]:hover:bg-primary-light',
          defaults.range_middle,
        ),
        range_end: cn(
          'bg-primary rounded-r text-white [&>button]:hover:bg-primary-dark',
          defaults.range_end,
        ),
        selected: cn('bg-primary rounded text-white', defaults.selected),
        today: cn('font-bold underline', defaults.today),
        outside: cn('text-msb-base-light', defaults.outside),
        disabled: cn('text-msb-base-light opacity-50', defaults.disabled),
        hidden: cn('invisible', defaults.hidden),
        ...classNames,
      }}
      components={{
        Chevron: ({ className, orientation }) => (
          <span
            aria-hidden="true"
            className={cn(
              'size-5',
              {
                'icon-[mdi--chevron-left]': orientation === 'left',
                'icon-[mdi--chevron-right]': orientation === 'right',
                'icon-[mdi--chevron-up]': orientation === 'up',
                'icon-[mdi--chevron-down]': orientation === 'down',
              },
              className,
            )}
          />
        ),
        ...components,
      }}
      {...props}
    />
  );
}
