import { CalendarMeeting } from '@/utils/calendarHelpers';
import { CardProps } from '@matsugov/ui/Card';
import { PhoneLink } from './PhoneLink';
import { EventCard } from './Page/EventCard';

const phoneRx = /(\+?\d?.?\(?\d{3}\)?.?\d{3}.?\d{4})/g;

export function MeetingCard({
  meeting,
  ...props
}: {
  meeting: CalendarMeeting;
} & Omit<CardProps, 'children'>) {
  const parts = meeting.title?.split(/\((.+)\)/);
  const title = parts?.shift();
  const subTitle = parts?.shift();
  const subParts = subTitle?.split(phoneRx);

  const locationParts = meeting.location?.split('USA & ');

  const partOne = locationParts?.shift();

  const partTwo = locationParts?.shift();

  const zoomRegex = /(?<=&?\s*(?:zoom).+ID:\s+)(\d+\s+\d+\s+\d+(\s+\d+)*)/i;
  const teamsRegex = /(?<=&?\s*(?:teams).+ID:\s+)(\d+\s+\d+\s+\d+(\s+\d+)*)/i;
  const bothRegex =
    /(?<=&?\s*(?:teams|zoom).+ID:\s+)(\d+\s+\d+\s+\d+(\s+\d+)*)/gi;

  const passcodeRegex = /passcode:\s*([A-Za-z0-9]+)/i;

  const isZoom = partOne?.match(zoomRegex) || partTwo?.match(zoomRegex);
  const isTeams = partOne?.match(teamsRegex) || partTwo?.match(teamsRegex);

  let meetingId: string | undefined;
  let passcode: string | undefined;
  let joinUrl: string | undefined;

  // Check Zoom first
  if (isZoom) {
    const match = partOne?.match(zoomRegex) || partTwo?.match(zoomRegex);
    meetingId = match?.[1]?.replace(/\s/g, '');
    passcode = (partOne?.match(passcodeRegex) ||
      partTwo?.match(passcodeRegex))?.[1];
    if (meetingId) {
      joinUrl = `https://zoom.us/j/${meetingId}${passcode ? `?pwd=${passcode}` : ''}`;
    }
  } else if (isTeams) {
    const match = partOne?.match(teamsRegex) || partTwo?.match(teamsRegex);
    meetingId = match?.[1]?.replace(/\s/g, '');

    joinUrl = `https://www.microsoft.com/en-us/microsoft-teams/join-a-meeting`;
  }

  function getAddress() {
    if (partOne) {
      if (partOne && partTwo) {
        return partOne;
      }

      if (partOne && !partTwo && !joinUrl) {
        return partOne;
      }
      return;
    }
    return 'muffins';
  }

  function getMeetingLocation() {
    const text = partTwo || (joinUrl ? meeting.location : '');
    if (!text) return '';
    const cleanedText = text.replace('ID: ID:', 'ID:');

    const segments = [];
    let lastIndex = 0;

    for (const match of cleanedText.matchAll(bothRegex)) {
      const id = match[1];
      const start = match.index!;
      const end = start + match[0].length;

      segments.push(cleanedText.slice(lastIndex, start));
      segments.push(
        <span key={start} className="font-semibold">
          {id}
        </span>,
      );
      lastIndex = end;
    }

    segments.push(cleanedText.slice(lastIndex));
    return segments;
  }

  if (!meeting.date) return null;

  return (
    <EventCard
      eventTitle={title}
      date={meeting.date}
      locationSlot={getMeetingLocation()}
      location={meeting.location}
      address={getAddress()}
      subtitle={subParts?.map((part, index) =>
        phoneRx.test(part) ? (
          <span key={`${meeting.id}-${index}-phone`}>
            {' '}
            <PhoneLink phoneNumber={part.trim()}>{part.trim()}</PhoneLink>
          </span>
        ) : (
          <span key={index}>{part}</span>
        ),
      )}
      joinUrl={joinUrl}
      meetingType={isZoom ? 'Zoom' : isTeams ? 'Teams' : 'Virtual'}
      {...props}
    />
  );
}
