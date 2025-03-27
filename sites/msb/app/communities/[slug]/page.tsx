import {
  GET_COMMUNITY_META_QUERY,
  GET_COMMUNITY_QUERY,
} from '@msb/js-sdk/queries';

import { Metadata } from 'next';
import { getPageMeta } from '@/utils/pageHelpers';
import { PageProps } from '@/types';
import PageController from '@/components/PageController';

export const generateMetadata = (props: PageProps): Promise<Metadata> =>
  getPageMeta('community', GET_COMMUNITY_META_QUERY, props);

export default async function Community(props: PageProps) {
  return (
    <PageController
      query={GET_COMMUNITY_QUERY}
      listName="community"
      params={props.params}
      map={{
        layerId: 'cc6808c179cc4f3ba282814afdc3882c',
        layerUrl:
          'https://maps.matsugov.us/map/rest/services/OpenData/Administrative_Communities/FeatureServer',
        layerOpacity: 0.5,
        itemKey: 'CC_NAME',
      }}
    />
  );
}
