import { Button } from '@matsugov/ui/Button';
import { calendar, calendar_v3 } from '@googleapis/calendar';
import { Meeting, MeetingCard } from './MeetingCard';

export async function Meetings() {
  const calApi = calendar('v3');
  function getCalendarParams(calendarId: string | undefined, query?: string) {
    return {
      key: process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY,
      calendarId: calendarId,
      timeMin: new Date().toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
      maxResults: 4,
      q: query,
    } satisfies calendar_v3.Params$Resource$Events$List;
  }

  const [resMain, resAssembly, resPlanning, resService] = await Promise.all([
    calApi.events.list(
      getCalendarParams(process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_MAIN_ID),
    ),
    calApi.events.list(
      getCalendarParams(process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ASSEMBLY_ID),
    ),
    calApi.events.list(
      getCalendarParams(process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_PLANNING_ID),
    ),
    calApi.events.list(
      getCalendarParams(process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_SERVICE_ID),
    ),
  ]);

  function parseMeeting(item: calendar_v3.Schema$Event) {
    return {
      id: item.id,
      date: item.start?.date || item.start?.dateTime,
      location: item.location || 'No location provided',
      title: item.summary || 'No title provided',
    } satisfies Meeting;
  }

  const items = [
    ...(resMain.data.items ? resMain.data.items.map(parseMeeting) : []),
    ...(resAssembly.data.items ? resAssembly.data.items.map(parseMeeting) : []),
    ...(resPlanning.data.items ? resPlanning.data.items.map(parseMeeting) : []),
    ...(resService.data.items ? resService.data.items.map(parseMeeting) : []),
  ]
    .sort((a, b) => {
      const dateA = new Date(a.date ?? '').getTime();
      const dateB = new Date(b.date ?? '').getTime();
      return dateA - dateB;
    })
    .splice(0, 4);

  return (
    <>
      <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {items.map((meeting) => (
          <MeetingCard key={meeting.id} meeting={meeting} />
        ))}
      </ul>
      <div className="flex flex-row justify-center items-center w-full">
        <Button color="primary" big>
          View all
        </Button>
      </div>
    </>
  );
}
