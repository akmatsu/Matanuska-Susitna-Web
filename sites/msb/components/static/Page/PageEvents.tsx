import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';
import { PageSection } from './PageSection';
import {
  EventInfoView,
  toEventInfoData,
  type EventInfoData,
} from './EventInfo';

const PageEventsFragment = gql(`
    fragment PageEvents on BasePageWithDefaultRelationships {
      events(take: 4, orderBy:  {
        startDate: desc
      }, where:  {
        startDate:  {
            gte: $now
        }
      }) {
        id
        ...EventInfo
      }      
    }
`);

export type PageEventData = EventInfoData & { id: string };

export function PageEventsView(props: { events?: PageEventData[] | null }) {
  const { events } = props;
  if (!events?.length) return null;

  return (
    <PageSection title="Upcoming Events">
      <ul>
        {events.map((event) => (
          <EventInfoView key={event.id} event={event} />
        ))}
      </ul>
    </PageSection>
  );
}

/** Maps the Keystone GraphQL page events fragment to view data. */
export function toPageEventsData(
  ref: FragmentType<typeof PageEventsFragment>,
): PageEventData[] | null {
  const data = getFragmentData(PageEventsFragment, ref);
  const events = 'events' in data ? data.events : null;
  return (
    events?.map((event) => ({ id: event.id, ...toEventInfoData(event) })) ??
    null
  );
}

export function PageEvents(props: {
  data: FragmentType<typeof PageEventsFragment>;
}) {
  return <PageEventsView events={toPageEventsData(props.data)} />;
}
