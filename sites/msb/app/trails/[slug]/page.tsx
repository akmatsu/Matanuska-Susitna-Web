import { PageProps } from '@/types';
import { getPageMeta } from '@/utils/pageHelpers';
import { Metadata } from 'next';
import PageController from '@/components/PageController';
import { GET_TRAIL_META_QUERY, GET_TRAIL_QUERY } from '@msb/js-sdk';

export const generateMetadata = async (props: PageProps): Promise<Metadata> =>
  getPageMeta('trail', GET_TRAIL_META_QUERY, props);

export default async function Trail(props: PageProps) {
  return (
    <PageController
      query={GET_TRAIL_QUERY}
      listName="trail"
      params={props.params}
    />
  );
}
