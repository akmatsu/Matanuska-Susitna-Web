import { GET_SERVICE_META_QUERY, GET_SERVICE_QUERY } from '@msb/js-sdk/queries';
import { Metadata } from 'next';
import { getPageMeta } from '@/utils/pageHelpers';
import PageController from '@/components/PageController';

export const generateMetadata = (props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> => getPageMeta('service', GET_SERVICE_META_QUERY, props);

export default async function Service(props: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <PageController
      query={GET_SERVICE_QUERY}
      listName="service"
      params={props.params}
    />
  );
}
