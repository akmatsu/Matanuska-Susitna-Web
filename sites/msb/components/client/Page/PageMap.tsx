import { MapWrapper } from '@/components/client/MapWrapper';
import { ComponentProps } from 'react';
import { PageSection } from '../../static/Page/PageSection';
import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';

const pageMapFragment = gql(`
  fragment PageMap on BasePage {
    title
  }
`);

export function PageMap(props: {
  page?: FragmentType<typeof pageMapFragment>;
  map?: ComponentProps<typeof MapWrapper>;
}) {
  const page = getFragmentData(pageMapFragment, props.page);
  if (!page?.title) return null;

  return (
    <PageSection title="Map" noMargins>
      <div className="aspect-1/1 w-full overflow-hidden border rounded-sm">
        <MapWrapper {...props.map} itemId={page.title.toUpperCase()} />
      </div>
    </PageSection>
  );
}
