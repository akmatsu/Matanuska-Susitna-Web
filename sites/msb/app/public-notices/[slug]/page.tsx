import PageController from '@/components/PageController';
import { PageProps } from '@/types';
import { getPageMeta } from '@/utils/pageHelpers';
import { GET_PUBLIC_NOTICE, GET_PUBLIC_NOTICE_META } from '@msb/js-sdk';

export const generateMetadata = (props: PageProps) =>
  getPageMeta('publicNotice', GET_PUBLIC_NOTICE_META, props);

export default function PublicNoticePage(props: PageProps) {
  return (
    <PageController
      listName="publicNotice"
      query={GET_PUBLIC_NOTICE}
      params={props.params}
    />
  );
}
