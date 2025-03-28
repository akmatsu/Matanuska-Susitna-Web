import PageController from '@/components/PageController';
import { PageProps } from '@/types';
import { getPageMeta } from '@/utils/pageHelpers';
import { GET_PARK_META_QUERY, GET_PARK_QUERY } from '@msb/js-sdk';

export const generateMetadata = (props: PageProps) =>
  getPageMeta('park', GET_PARK_META_QUERY, props);

export default async function ParkPage(props: PageProps) {
  return (
    <PageController
      query={GET_PARK_QUERY}
      listName="park"
      params={props.params}
    />
  );
}
