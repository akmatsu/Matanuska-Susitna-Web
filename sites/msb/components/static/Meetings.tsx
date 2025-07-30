import { MeetingCard } from './MeetingCard';
import { LinkButton } from './LinkButton';
import { searchCalendarEvents } from '@/utils/calendarHelpers';

export async function Meetings() {
  const { items } = await searchCalendarEvents({ limit: 4 });

  return (
    <>
      <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {items.map((meeting) => (
          <MeetingCard key={meeting.id} meeting={meeting} />
        ))}
      </ul>
      <div className="flex flex-row justify-center items-center w-full">
        <LinkButton href="/boards/public-meetings" color="primary" big>
          View all
        </LinkButton>
      </div>
    </>
  );
}
