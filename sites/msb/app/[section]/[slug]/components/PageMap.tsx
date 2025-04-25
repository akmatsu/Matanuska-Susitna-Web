import { MapWrapper } from '@/components/MapWrapper';
import { ComponentProps } from 'react';
import { PageSection } from './PageSection';

export function PageMap(props: {
  itemId: string;
  map?: ComponentProps<typeof MapWrapper>;
}) {
  if (props.map) {
    return (
      <PageSection title="Map">
        <div className="aspect-1/1 w-full overflow-hidden border rounded-sm">
          <MapWrapper {...props.map} itemId={props.itemId.toUpperCase()} />
        </div>
      </PageSection>
    );
  }
}
