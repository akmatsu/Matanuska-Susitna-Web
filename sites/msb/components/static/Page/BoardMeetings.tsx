import { PageSection } from './PageSection';
import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';
import { MeetingCard } from '../MeetingCard';
import { searchCalendarEvents } from '@/utils/calendarHelpers';

const BoardMeetingsFragment = gql(`
  fragment BoardMeetings on Board {
    title
    calendarId
    calendarQueryString
  }
`);

export async function BoardMeetings(props: {
  data?: FragmentType<typeof BoardMeetingsFragment> | null;
}) {
  const data = getFragmentData(BoardMeetingsFragment, props.data);

  if (!data?.calendarId || !data?.title) return null;

  const { items } = await searchCalendarEvents({
    calendarIds: [data.calendarId],
    query: data.calendarQueryString || data.title,
  });

  return (
    <PageSection title="Upcoming Meetings" noMargins>
      <ul className="grid grid-cols-1 gap-4">
        {items?.map((event) => <MeetingCard key={event.id} meeting={event} />)}
      </ul>
    </PageSection>
  );
}
