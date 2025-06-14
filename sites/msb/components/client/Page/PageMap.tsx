import { MapWrapper } from '@/components/client/MapWrapper';
import { ComponentProps } from 'react';
import { PageSection } from '../../static/Page/PageSection';

export function PageMap(props: {
  itemId?: string | null;
  map?: ComponentProps<typeof MapWrapper>;
}) {
  if (props.map) {
    return (
      <PageSection title="Map">
        <div className="aspect-1/1 w-full overflow-hidden border rounded-sm">
          <MapWrapper {...props.map} itemId={props.itemId?.toUpperCase()} />
        </div>
      </PageSection>
    );
  }
}
