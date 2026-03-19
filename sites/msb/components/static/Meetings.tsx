import { MeetingCard } from './MeetingCard';
import { LinkButton } from './LinkButton';
import { searchCalendarEvents } from '@/utils/calendarHelpers';
import { startOfDay } from 'date-fns';
import { TZDate } from '@date-fns/tz';

export async function Meetings() {
  const { items } = await searchCalendarEvents({
    limit: 4,
    timeMin: startOfDay(TZDate.tz('America/Anchorage')).toISOString(),
  });

  return (
    <>
      <ul className="mb-4 flex flex-col gap-4 md:grid md:grid-cols-1 lg:grid-cols-2">
        {items.map((meeting) => (
          <MeetingCard key={meeting.id} meeting={meeting} />
        ))}
      </ul>
      <div className="flex w-full flex-row items-center justify-center">
        <LinkButton href="/boards/public-meetings" color="primary" size="lg">
          View all
        </LinkButton>
      </div>
    </>
  );
}
