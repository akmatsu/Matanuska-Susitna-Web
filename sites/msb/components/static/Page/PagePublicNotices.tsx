import { PublicNotices } from '@/components/static/landing/PublicNotices';
import { ComponentProps } from 'react';
import { PageSection } from './PageSection';

export function PagePublicNotices(props: {
  items?: ComponentProps<typeof PublicNotices>['items'] | null;
}) {
  if (props.items && props.items.length > 0) {
    return (
      <PageSection title="Public Notices & Announcements">
        <PublicNotices items={props.items} />
      </PageSection>
    );
  }
}
