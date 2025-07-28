import { PageSection } from './PageSection';

export function PageEvents(props: { listName: string }) {
  if (props.listName !== 'service' && props.listName !== 'events')
    return (
      <PageSection title="Upcoming Meetings" noMargins>
        <div>muffins</div>
      </PageSection>
    );
}
