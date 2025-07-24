import { Button } from '@matsugov/ui/Button';
import { calendar } from '@googleapis/calendar';
import { MeetingCard } from './MeetingCard';

export async function Meetings() {
  const calApi = calendar('v3');
  const res = await calApi.events.list({
    key: process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY,
    calendarId: process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_MAIN_ID,
    timeMin: new Date().toISOString(),
    singleEvents: true,
    orderBy: 'startTime',
    maxResults: 4,
    q: 'planning commission',
  });

  const items =
    res.data.items?.map((item) => ({
      id: item.id,
      date: item.start?.date || item.start?.dateTime,
      location: item.location || 'No location provided',
      title: item.summary || 'No title provided',
    })) || [];

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
