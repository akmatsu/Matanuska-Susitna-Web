import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';
import { PageSection } from './PageSection';
import { EventInfo } from './EventInfo';

const PageEventsFragment = gql(`
    fragment PageEvents on BasePageWithSlug {
      ... on BasePageWithDefaultRelationships {
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
    }
`);

export function PageEvents(props: {
  data: FragmentType<typeof PageEventsFragment>;
}) {
  const data = getFragmentData(PageEventsFragment, props.data);
  const events = 'events' in data ? data.events : null;
  if (!events?.length) return null;

  return (
    <PageSection title="Upcoming Events">
      <ul>
        {events.map((event) => (
          <EventInfo key={event.id} data={event} />
        ))}
      </ul>
    </PageSection>
  );
}
