import { AddressLink } from '@/components/client/AddressLink';
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
      <div className="flex flex-col sm:flex-row h-full w-full">
        {date && (
          <div className="bg-base-lightest p-2 flex justify-center items-center h-auto min-h-full">
            <div className="bg-surface-primary aspect-square h-24 w-24 md:h-32 md:w-32 flex flex-col justify-center items-center text-white gap-2 rounded-full">
              <p className="md:text-xl font-bold text-center">
                <DateTime date={date} formatStr="MMM do" />
                <br />
                <span className="md:text-xl font-normal">
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
        <div className="flex flex-col justify-between gap-4 w-full text-center sm:text-left h-full">
          <CardHeader>
            <CardTitle className="text-center sm:text-left">
              {eventTitle}
            </CardTitle>
            {subtitle && (
              <span className="text-sm text-base-dark">{subtitle}</span>
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
                  location,
                  date,
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
