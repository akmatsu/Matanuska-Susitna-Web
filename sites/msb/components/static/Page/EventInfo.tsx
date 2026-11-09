import { type CardProps } from '@matsugov/ui';
import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';
import type { EventSummary } from '@msb/cms-sdk';
import { EventCard } from './EventCard';

const EventInfoFragment = gql(`
  fragment EventInfo on Event {
    title
    description
    startDate
  }
`);

export type EventInfoData = Pick<
  EventSummary,
  'title' | 'description' | 'startDate'
>;

function normalizeString(value: unknown): string | null {
  if (typeof value === 'string') {
    return value;
  }
  return null;
}

export function EventInfoView({
  event,
  ...props
}: { event: EventInfoData } & Omit<CardProps, 'children'>) {
  return (
    <EventCard
      eventTitle={event.title}
      location={event.description}
      date={event.startDate}
      {...props}
    />
  );
}

/** Maps the Keystone GraphQL event fragment to view data. */
export function toEventInfoData(
  ref: FragmentType<typeof EventInfoFragment>,
): EventInfoData {
  const event = getFragmentData(EventInfoFragment, ref);
  return {
    title: event.title ?? '',
    description: event.description ?? '',
    startDate: normalizeString(event.startDate),
  };
}

export function EventInfo({
  data,
  ...props
}: {
  data: FragmentType<typeof EventInfoFragment>;
} & Omit<CardProps, 'children'>) {
  return <EventInfoView event={toEventInfoData(data)} {...props} />;
}
