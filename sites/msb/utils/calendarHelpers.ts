/**
 * Utility functions for interacting with Google Calendar API. Server side only.
 */

import { calendar, calendar_v3 } from '@googleapis/calendar';

export interface CalendarMeeting {
  id?: string | null;
  date?: string | null;
  location?: string | null;
  title: string;
}

type RequestData = Omit<calendar_v3.Schema$Events, 'items'>;

export interface searchCalendarEventsOptions {
  query?: string;
  calendarIds?: string[];
  limit?: number;
  prevRequestData?: { [key: string]: RequestData };
  timeMin?: string;
  timeMax?: string;
}

export async function searchCalendarEvents(
  opts?: searchCalendarEventsOptions,
): Promise<{
  items: CalendarMeeting[];
  reqData: { [key: string]: RequestData };
}> {
  const calendarIds = opts?.calendarIds || [
    process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_MAIN_ID || '',
    process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ASSEMBLY_ID || '',
    process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_PLANNING_ID || '',
    process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_SERVICE_ID || '',
    process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_COMMUNITY_ID || '',
  ];

  const calApi = calendar('v3');
  const responses = await Promise.all(
    calendarIds.map((id) =>
      calApi.events.list(
        getCalendarParams({
          calendarId: id,
          query: opts?.query,
          limit: opts?.limit || 8,
          pageToken: opts?.prevRequestData?.[id]?.nextPageToken || undefined,
          timeMin: opts?.timeMin,
          timeMax: opts?.timeMax,
        }),
      ),
    ),
  );

  let items: CalendarMeeting[] = [];
  const reqData: { [key: string]: RequestData } = {};

  responses.forEach((res, index) => {
    const { items: it, ...rest } = res.data;
    reqData[calendarIds[index]] = rest;

    if (it) it.forEach((item) => items.push(parseMeeting(item)));
  });

  items.sort((a, b) => {
    const dateA = new Date(a.date || 0).getTime();
    const dateB = new Date(b.date || 0).getTime();
    return dateA - dateB;
  });

  if (opts?.limit) {
    items = items.slice(0, opts.limit);
  }

  return {
    items,
    reqData,
  };
}

function parseMeeting(item: calendar_v3.Schema$Event) {
  return {
    id: item.id,
    date: item.start?.date || item.start?.dateTime,
    location: item.location || 'No location provided',
    title: item.summary || 'No title provided',
  } satisfies CalendarMeeting;
}

function getTimeMin(timeMin?: string) {
  if (timeMin) return new Date(timeMin).toISOString();
  const now = new Date();
  now.setHours(0, 0, 0, 0); // Set to start of the day
  return now.toISOString();
}

function getCalendarParams(opts: {
  calendarId: string | undefined;
  query?: string;
  limit?: number;
  pageToken?: string;
  timeMin?: string;
  timeMax?: string;
}) {
  return {
    key: process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY,
    calendarId: opts.calendarId,
    timeMin: getTimeMin(opts.timeMin),
    timeMax: opts.timeMax ? new Date(opts.timeMax).toISOString() : undefined,
    singleEvents: true,
    orderBy: 'startTime',
    maxResults: opts.limit,
    pageToken: opts.pageToken,
    q: opts.query,
  } satisfies calendar_v3.Params$Resource$Events$List;
}
