import { format } from 'date-fns';
import { AddressLink } from '../client/AddressLink';
import { AddToCalendarButton } from './AddToCalendarButton';
import { CalendarMeeting } from '@/utils/calendarHelpers';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardProps,
  CardTitle,
} from '@matsugov/ui/Card';
import { PhoneLink } from './PhoneLink';
import { LinkButton } from './LinkButton';
import clsx from 'clsx';

const phoneRx = /(\+?\d?.?\(?\d{3}\)?.?\d{3}.?\d{4})/g;

export function MeetingCard({
  meeting,
  containerClassName,
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

  return (
    <Card
      {...props}
      className="h-full"
      containerClassName={clsx('h-full w-full', containerClassName)}
    >
      <div className="flex flex-col sm:flex-row h-full w-full">
        {meeting.date && (
          <div className="bg-base-lightest p-2 flex justify-center items-center h-auto min-h-full">
            <div className="bg-primary-dark aspect-square h-24 w-24 md:h-32 md:w-32 flex flex-col justify-center items-center text-white gap-2 rounded-full">
              <p className="md:text-xl font-bold text-center">
                {format(meeting.date, 'MMM do')}
                <br />
                <span className="md:text-xl font-normal">
                  {format(meeting.date, 'yyyy')}
                </span>
                <br />
                <span className="text-xs font-normal">
                  {format(meeting.date, 'h:mm a')}
                </span>
              </p>
            </div>
          </div>
        )}
        <div className="flex flex-col justify-between gap-4 w-full text-center sm:text-left h-full">
          <CardHeader>
            <CardTitle className="text-center sm:text-left">{title}</CardTitle>
            <span className="text-sm text-base-dark">
              {subParts?.map((part, index) =>
                phoneRx.test(part) ? (
                  <span key={`${meeting.id}-${index}-phone`}>
                    {' '}
                    <PhoneLink phoneNumber={part.trim()}>
                      {part.trim()}
                    </PhoneLink>
                  </span>
                ) : (
                  <span key={index}>{part}</span>
                ),
              )}
            </span>
          </CardHeader>
          <CardBody>
            <address className="not-italic">
              <AddressLink address={getAddress()} />
              <p>{getMeetingLocation()}</p>
            </address>
          </CardBody>
          <CardFooter className="justify-center sm:justify-end">
            {joinUrl && (
              <LinkButton
                href={joinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs"
              >
                Join {isZoom ? 'Zoom' : 'Teams'} Meeting
              </LinkButton>
            )}
            <AddToCalendarButton meeting={meeting} />
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}
