import { PageSection } from './PageSection';
import { calendar } from '@googleapis/calendar';
import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';
import { Meeting, MeetingCard } from '../MeetingCard';

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
  const calApi = calendar('v3');

  const res = await calApi.events.list({
    key: process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY,
    calendarId: data.calendarId,
    timeMin: new Date().toISOString(),
    singleEvents: true,
    orderBy: 'startTime',
    q: data.calendarQueryString || data.title,
  });
  const items = res.data.items?.map(
    (item) =>
      ({
        id: item.id,
        date: item.start?.date || item.start?.dateTime,
        location: item.location || 'No location provided',
        title: item.summary || 'No title provided',
      }) satisfies Meeting,
  );

  return (
    <PageSection title="Upcoming Meetings" noMargins>
      <ul className="grid grid-cols-1 gap-4">
        {items?.map((event) => <MeetingCard key={event.id} meeting={event} />)}
      </ul>
    </PageSection>
  );
}
