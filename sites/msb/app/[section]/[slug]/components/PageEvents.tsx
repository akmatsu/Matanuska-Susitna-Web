import { Meetings } from '@/components';
import { PageSection } from './PageSection';

export function PageEvents(props: { listName: string }) {
  if (props.listName !== 'service' && props.listName !== 'events')
    return (
      <PageSection title="Events">
        <Meetings />
      </PageSection>
    );
}
