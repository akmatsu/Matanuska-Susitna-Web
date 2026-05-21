import { type CardProps } from '@matsugov/ui';
import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';
import { EventCard } from './EventCard';

const EventInfoFragment = gql(`
  fragment EventInfo on Event {
    title
    description
    startDate
  }
`);

function normalizeString(value: unknown): string | null {
  if (typeof value === 'string') {
    return value;
  }
  return null;
}

export function EventInfo({
  data,
  ...props
}: {
  data: FragmentType<typeof EventInfoFragment>;
} & Omit<CardProps, 'children'>) {
  const event = getFragmentData(EventInfoFragment, data);
  if (!event) return null;

  return (
    <EventCard
      eventTitle={event.title}
      location={event.description}
      date={normalizeString(event.startDate)}
      {...props}
    />
  );
}
