import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardProps,
  CardTitle,
  PhoneLink,
} from '@matsugov/ui';
import { format } from 'date-fns';
import { AddressLink } from '../client/AddressLink';
import { AddToCalendarButton } from './AddToCalendarButton';

const phoneRx = /(\+?\d?.?\(?\d{3}\)?.?\d{3}.?\d{4})/g;
export interface Meeting {
  id?: string | null;
  date?: string | null;
  location: string;
  title: string;
}

export function MeetingCard({
  meeting,
  ...props
}: {
  meeting: Meeting;
} & Omit<CardProps, 'children'>) {
  const parts = meeting.title.split(/\((.+)\)/);
  const title = parts.shift();
  const subTitle = parts.shift();
  const subParts = subTitle?.split(phoneRx);

  return (
    <Card {...props} className="h-full">
      <div className="flex flex-col sm:flex-row h-full">
        {meeting.date && (
          <div className="bg-base-lightest p-2 flex justify-center items-center h-full">
            <div className="bg-primary-dark aspect-square w-full h-full max-h-24 max-w-24 md:max-h-32 md:max-w-32 flex flex-col justify-center items-center text-white gap-2 rounded-full">
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
        <div className="flex flex-col justify-between gap-4 w-full text-center sm:text-left">
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
              <AddressLink address={meeting.location} />
            </address>
          </CardBody>
          <CardFooter className="justify-center sm:justify-end">
            <AddToCalendarButton meeting={meeting} />
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}
