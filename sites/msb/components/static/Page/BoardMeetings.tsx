import { PageSection } from './PageSection';
import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';
import { MeetingCard } from '../MeetingCard';
import { searchCalendarEvents } from '@/utils/calendarHelpers';

const BoardMeetingsFragment = gql(`
  fragment BoardMeetings on Board {
    title
    calendarId
    calendarQueryString
    type
  }
`);

function getCalendarId(type: string, title: string): string {
  switch (type) {
    case 'board':
      const isAssembly =
        title.toLocaleLowerCase() === 'assembly' ||
        title.toLocaleLowerCase() === 'the assembly';
      return isAssembly
        ? process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ASSEMBLY_ID || ''
        : process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_MAIN_ID || '';
    case 'ssa_board':
      return process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_SERVICE_ID || '';
    case 'fsa_board':
      return process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_SERVICE_ID || '';
    case 'rsa_board':
      return process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_SERVICE_ID || '';
    case 'other':
      return process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_MAIN_ID || '';
    case 'community_council':
      return process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_COMMUNITY_ID || '';
    default:
      return '';
  }
}

export async function BoardMeetings(props: {
  data?: FragmentType<typeof BoardMeetingsFragment> | null;
}) {
  const data = getFragmentData(BoardMeetingsFragment, props.data);

  if (!data?.type || !data?.title) return null;
  const calendarId = getCalendarId(data.type, data.title);

  const { items } = await searchCalendarEvents({
    calendarIds: [calendarId],
    query: data.calendarQueryString || data.title,
  });

  if (!items || items.length === 0) return null;

  return (
    <PageSection title="Upcoming Meetings" noMargins>
      <ul className="grid grid-cols-1 gap-4">
        {items?.map((event) => (
          <MeetingCard
            key={event.id}
            meeting={event}
            containerClassName="h-full"
          />
        ))}
      </ul>
    </PageSection>
  );
}
