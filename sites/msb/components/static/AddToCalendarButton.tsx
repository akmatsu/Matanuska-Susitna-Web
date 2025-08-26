'use client';
import { DropdownButton } from '@matsugov/ui/DropdownButton';
import { ButtonProps } from '@matsugov/ui/Button';
import { ComponentProps } from 'react';
import { createEvent } from 'ics';
import { saveAs } from 'file-saver';
import slugify from 'voca/slugify';
import { addMinutes, format } from 'date-fns';
import { CalendarMeeting } from '@/utils/calendarHelpers';

interface AddToCalendarButtonProps
  extends Omit<ComponentProps<typeof DropdownButton>, 'buttonProps' | 'label'> {
  label?: string;
  buttonProps?: Partial<ButtonProps>;
  meeting: CalendarMeeting;
}

function createAndDownloadICSFile(
  meeting: AddToCalendarButtonProps['meeting'],
) {
  if (!meeting.date) return;

  const dt = new Date(meeting.date);

  if (!meeting.title) {
    return;
  }

  createEvent(
    {
      title: meeting.title || undefined,
      start: [
        dt.getFullYear(),
        dt.getMonth() + 1,
        dt.getDate(),
        dt.getHours(),
        dt.getMinutes(),
      ],
      duration: { minutes: 30 },
      location: meeting.location || undefined,
    },
    (error, value) => {
      if (error) {
        console.error('Error creating ICS event:', error);
        return;
      }

      const blob = new Blob([value], {
        type: 'text/calendar;charset=utf-8',
      });

      saveAs(blob, `${slugify(meeting.title || undefined)}.ics`);
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

  function makeGoogleParams() {
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: meeting.title,
      dates: `${dtStart}/${dtEnd}`,
      details: 'Details about the meeting',
      ...(meeting.location && { location: meeting.location }),
    });
    return params.toString();
  }

  function makeOutlookParams() {
    const params = new URLSearchParams({
      subject: meeting.title,
      startdt: isoStart,
      enddt: isoEnd,
      body: 'Details about the meeting',
      ...(meeting.location && { location: meeting.location }),
    });
    return params.toString();
  }

  function makeYahooParams() {
    const params = new URLSearchParams({
      title: meeting.title,
      st: yahooStart,
      dur: '0030',
      ...(meeting.location && { location: meeting.location }),
      details: 'Details about the meeting',
    });
    return params.toString();
  }

  const items = [
    {
      label: 'Apple Calendar',
      action: () => createAndDownloadICSFile(meeting),
    },
    {
      label: 'Google Calendar',
      href: `https://www.google.com/calendar/render?${makeGoogleParams()}`,
    },
    {
      label: 'Outlook Calendar',
      href: `https://outlook.live.com/calendar/0/deeplink/compose?${makeOutlookParams()}`,
    },
    {
      label: 'Yahoo Calendar',
      href: `https://calendar.yahoo.com/?${makeYahooParams()}`,
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
