import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardProps,
  CardTitle,
} from '@matsugov/ui';
import clsx from 'clsx';
import { ReactNode } from 'react';
import { LinkButton } from '../LinkButton';
import { AddToCalendarButton } from '../AddToCalendarButton';
import { DateTime } from '@/components/client/DateTime';

export function EventCard({
  meetingType = 'Teams',
  containerClassName,
  eventTitle,
  date,
  locationSlot,
  location,
  address,
  subtitle,
  joinUrl,
  ...props
}: {
  eventTitle?: string | null;
  date?: string | null;
  locationSlot?: ReactNode | null;
  location?: string | null;
  address?: string | null;
  subtitle?: ReactNode | null;
  joinUrl?: string | null;
  meetingType?: string | null;
} & Omit<CardProps, 'children'>) {
  return (
    <Card
      {...props}
      className="h-full"
      containerClassName={clsx('h-full w-full', containerClassName)}
    >
      <div className="flex h-full w-full flex-col sm:flex-row">
        {date && (
          <div className="bg-msb-base-lightest flex h-auto min-h-full items-center justify-center p-2">
            <div className="bg-surface-primary flex aspect-square h-24 w-24 flex-col items-center justify-center gap-2 rounded-full text-white md:h-32 md:w-32">
              <p className="text-center font-bold md:text-xl">
                <DateTime date={date} formatStr="MMM do" />
                <br />
                <span className="font-normal md:text-xl">
                  <DateTime date={date} formatStr="yyyy" />
                </span>
                <br />
                <span className="text-xs font-normal">
                  <DateTime date={date} formatStr="h:mm a" />
                </span>
              </p>
            </div>
          </div>
        )}
        <div className="flex h-full w-full flex-col justify-between gap-4 text-center sm:text-left">
          <CardHeader>
            <CardTitle className="text-center sm:text-left">
              {eventTitle}
            </CardTitle>
            {subtitle && (
              <span className="text-msb-base-dark text-sm">{subtitle}</span>
            )}
          </CardHeader>
          <CardBody>
            {(address || location) && (
              <address className="not-italic">
                {address && <p>{address}</p>}
                {locationSlot ? (
                  <p>{locationSlot}</p>
                ) : location && location !== address ? (
                  <p>{location}</p>
                ) : null}
              </address>
            )}
          </CardBody>
          <CardFooter className="justify-center sm:justify-end">
            {joinUrl && (
              <LinkButton
                href={joinUrl}
                target="_blank"
                rel="noopener noreferrer"
                size="sm"
              >
                Join {meetingType} Meeting
              </LinkButton>
            )}
            {eventTitle && date && (
              <AddToCalendarButton
                buttonProps={{
                  color: 'primary',
                  size: 'sm',
                }}
                meeting={{
                  location: `${address || location || ''}`,
                  date,
                  details: `${address || ''}${location || ''}`,
                  title: eventTitle,
                }}
              />
            )}
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}
