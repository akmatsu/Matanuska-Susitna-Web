'use client';
import * as React from 'react';
import { type DateRange } from 'react-day-picker';
import clsx from 'clsx';
import { Popover, PopoverContent, PopoverTrigger } from '../Popover';
import { Calendar, type CalendarProps } from './Calendar';

export type { DateRange };

type DateRangePickerProps = {
  id: string;
  label: string;
  value: DateRange | undefined;
  onChange: (range: DateRange | undefined) => void;
  placeholder?: string;
  className?: string;
  /** Lets callers limit navigation, disable days, and so on. */
  calendarProps?: Omit<
    Extract<CalendarProps, { mode: 'range' }>,
    'mode' | 'selected' | 'onSelect'
  >;
};

const dateFormat = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' });

function formatRange(range: DateRange | undefined) {
  if (!range?.from) return undefined;
  if (!range.to) return `${dateFormat.format(range.from)} onward`;
  return dateFormat.formatRange(range.from, range.to);
}

/**
 * A button that opens a calendar for choosing a start and end date.
 * Styled to sit next to `TextField`.
 */
export function DateRangePicker({
  id,
  label,
  value,
  onChange,
  placeholder = 'Select dates',
  className,
  calendarProps,
}: DateRangePickerProps) {
  const labelId = `${id}-label`;
  const display = formatRange(value);

  return (
    <div className={clsx('relative', className)}>
      <span id={labelId} className="font-semibold">
        {label}
      </span>
      <Popover>
        <PopoverTrigger
          id={id}
          aria-labelledby={`${labelId} ${id}`}
          className="border-msb-base-lighter focus-ring flex h-10 w-full cursor-pointer items-center gap-2 rounded border bg-white px-2 text-left shadow-md"
        >
          <span
            aria-hidden="true"
            className="icon-[mdi--calendar-range] text-msb-base-dark size-5 shrink-0"
          />
          <span
            className={clsx('truncate', { 'text-msb-base-dark': !display })}
          >
            {display ?? placeholder}
          </span>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-auto">
          <Calendar
            {...calendarProps}
            mode="range"
            selected={value}
            onSelect={onChange}
          />
          {value?.from && (
            <button
              type="button"
              onClick={() => onChange(undefined)}
              className="focus-ring text-primary self-end rounded px-2 py-1 text-sm font-semibold underline"
            >
              Clear dates
            </button>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}
