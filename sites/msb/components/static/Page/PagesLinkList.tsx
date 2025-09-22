import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';
import { PageSection } from './PageSection';
import { Link } from '../Link';
import { ComponentProps } from 'react';

const PageLinkListFragment = gql(`
  fragment PageLinkList on BasePageWithSlug {
    id
    slug
    title
  }
`);

export function PagesLinkList(props: {
  data?: FragmentType<typeof PageLinkListFragment>[] | null;
  title: string;
  margins?: ComponentProps<typeof PageSection>['margins'];
}) {
  const data = getFragmentData(PageLinkListFragment, props.data);
  if (!data?.length) return null;

  return (
    <PageSection title={props.title} margins={props.margins}>
      <ul>
        {data.map((page) => (
          <li key={page.id}>
            <Link href={`/${page.slug}`}>{page.title}</Link>
          </li>
        ))}
      </ul>
    </PageSection>
  );
}
