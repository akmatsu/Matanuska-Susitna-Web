import { MeetingCard } from './MeetingCard';
import { LinkButton } from './LinkButton';
import { searchCalendarEvents } from '@/utils/calendarHelpers';
import { startOfDay } from 'date-fns';
import { TZDate } from '@date-fns/tz';

export async function Meetings() {
  const { items } = await searchCalendarEvents({
    limit: 4,
    timeMin: startOfDay(new TZDate()).toISOString(),
  });

  return (
    <>
      <ul className="flex flex-col md:grid md:grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {items.map((meeting) => (
          <MeetingCard key={meeting.id} meeting={meeting} />
        ))}
      </ul>
      <div className="flex flex-row justify-center items-center w-full">
        <LinkButton href="/boards/public-meetings" color="primary" size="lg">
          View all
        </LinkButton>
      </div>
    </>
  );
}
