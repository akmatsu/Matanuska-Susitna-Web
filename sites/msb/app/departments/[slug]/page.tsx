import PageController from '@/components/PageController';
import { PageProps } from '@/types';
import { getPageMeta } from '@/utils/pageHelpers';
import { GET_ORG_UNIT_META_QUERY, GET_ORG_UNIT_QUERY } from '@msb/js-sdk';
import { Metadata } from 'next';

export const generateMetadata = (props: PageProps): Promise<Metadata> =>
  getPageMeta('orgUnit', GET_ORG_UNIT_META_QUERY, props);

export default async function DepartmentPage(props: PageProps) {
  return (
    <PageController
      query={GET_ORG_UNIT_QUERY}
      listName="orgUnit"
      params={props.params}
    />
  );
}
