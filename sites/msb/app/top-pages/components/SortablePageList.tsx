import { Link } from '@/components/static/Link';
import { PageSection } from '@/components/static/Page';
import { getRedirectUrl } from '@/utils/stringHelpers';
import { Table, Td, Th, THead, Tr } from '@matsugov/ui';
import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';

const PageViewsListFragment = gql(`
  fragment PageViewsList on PageView {
    id
    item {
      __typename
      ... on BasePageWithSlug {
        id
        slug
      }

      ... on ElectionsPage {
        id
        title
      }

      ... on Url {
        title
        url
      }

      ... on AssemblyDistrict {
        title
        slug
      }

      ... on BasePage {
        title
      }
    }
  }
`);

export function PageViewsList(props: {
  title?: string;
  data?: FragmentType<typeof PageViewsListFragment>[] | null;
}) {
  const data = getFragmentData(PageViewsListFragment, props.data);
  if (!data) return null;
  const viewsWithRanks = data.map((view, index) => ({
    ...view,
    rank: index + 1,
  }));

  return (
    <PageSection title={props.title}>
      <Table>
        <THead>
          <Tr>
            <Th>Page Name</Th>
            <Th>Popularity Rank</Th>
          </Tr>
        </THead>
        <tbody>
          {viewsWithRanks.map((page) => (
            <Tr key={page.id}>
              <Td>
                <Link href={getRedirectUrl(page.item) || ''}>
                  {page.item?.title}
                </Link>
              </Td>
              <Td>{page.rank}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>
    </PageSection>
  );
}
