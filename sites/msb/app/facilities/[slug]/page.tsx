import PageController from '@/components/PageController';
import { PageProps } from '@/types';
import { getPageMeta } from '@/utils/pageHelpers';
import { GET_FACILITY_META, GET_FACILITY_QUERY } from '@msb/js-sdk';

export const generateMetadata = (props: PageProps) =>
  getPageMeta('facility', GET_FACILITY_META, props);

export default async function Facility(props: PageProps) {
  return (
    <PageController
      query={GET_FACILITY_QUERY}
      listName="facility"
      params={props.params}
    />
  );
}
