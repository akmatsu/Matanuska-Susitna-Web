'use client';
import { ButtonProps, DropdownButton } from '@matsugov/ui';
import { ComponentProps } from 'react';
import { createEvent } from 'ics';
import { saveAs } from 'file-saver';
import slugify from 'voca/slugify';
import { addMinutes, format } from 'date-fns';

interface AddToCalendarButtonProps
  extends Omit<ComponentProps<typeof DropdownButton>, 'buttonProps' | 'label'> {
  label?: string;
  buttonProps?: Partial<ButtonProps>;
  meeting: {
    id?: string | null;
    date?: string | null;
    location: string;
    title: string;
  };
}

function createAndDownloadICSFile(
  meeting: AddToCalendarButtonProps['meeting'],
) {
  if (!meeting.date) return;

  const dt = new Date(meeting.date);

  createEvent(
    {
      title: meeting.title,
      start: [
        dt.getFullYear(),
        dt.getMonth() + 1,
        dt.getDate(),
        dt.getHours(),
        dt.getMinutes(),
      ],
      duration: { minutes: 30 },
      location: meeting.location,
    },
    (error, value) => {
      if (error) {
        console.error('Error creating ICS event:', error);
        return;
      }

      const blob = new Blob([value], {
        type: 'text/calendar;charset=utf-8',
      });

      saveAs(blob, `${slugify(meeting.title)}.ics`);
    },
  );
}

export function AddToCalendarButton({
  label = 'Add to Calendar',
  buttonProps,
  meeting,
  ...props
}: AddToCalendarButtonProps) {
  const defaultButtonProps = {
    color: 'secondary' as const,
    className: 'text-xs' as const,
    ...buttonProps,
  } satisfies ButtonProps;

  const dt = new Date(meeting.date || '');

  const dtStart = format(dt, "yyyyMMdd'T'HHmmss");
  const dtEnd = format(addMinutes(dt, 30), "yyyyMMdd'T'HHmmss");

  const isoStart = dt.toISOString();
  const isoEnd = addMinutes(dt, 30).toISOString();

  const yahooStart = format(dt, "yyyyMMdd'T'HHmmss'Z'");

  const items = [
    {
      label: 'Apple Calendar',
      action: () => createAndDownloadICSFile(meeting),
    },
    {
      label: 'Google Calendar',
      href: `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(meeting.title)}&dates=${dtStart}/${dtEnd}&details=${encodeURIComponent('Details about the meeting')}&location=${encodeURIComponent(meeting.location)}`,
    },
    {
      label: 'Outlook Calendar',
      href: `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(meeting.title)}&startdt=${isoStart}&enddt=${isoEnd}&body=${encodeURIComponent('Details about the meeting')}&location=${encodeURIComponent(meeting.location)}`,
    },
    {
      label: 'Yahoo Calendar',
      href: `https://calendar.yahoo.com/?v=60&view=d&type=20&title=${encodeURIComponent(meeting.title)}&st=${yahooStart}&dur=0030&location=${encodeURIComponent(meeting.location)}&details=${encodeURIComponent('Details about the meeting')}`,
    },
    {
      label: 'iCal',
      action: () => createAndDownloadICSFile(meeting),
    },
  ];

  return (
    <DropdownButton
      {...props}
      label={label}
      buttonProps={defaultButtonProps}
      items={items}
    />
  );
}
