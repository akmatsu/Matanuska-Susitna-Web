'use client';
import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';
import { Button, Table, Td, Th, THead, Tr } from '@matsugov/ui';
import { Link } from '@/components/static/Link';
import { getRedirectUrl } from '@/utils/stringHelpers';
import { useEffect, useState } from 'react';
import { PageViewsListFragment as PVLF } from '@msb/js-sdk/graphql';

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

export function PageViewsListWrapper({
  defaultSortBy = 'popularity',
  ...props
}: {
  title?: string;
  data?: FragmentType<typeof PageViewsListFragment>[] | null;
  defaultSortBy?: 'popularity' | 'alphabetical';
}) {
  const data = getFragmentData(PageViewsListFragment, props.data);
  const [sortBy, setSortBy] = useState<'popularity' | 'alphabetical'>(
    defaultSortBy,
  );
  const [viewsWithRanks, setViewsWithRanks] = useState<
    (PVLF & { rank: number })[]
  >(data?.map((view, index) => ({ ...view, rank: index + 1 })) || []);

  if (!data) return null;

  useEffect(() => {
    if (sortBy === 'popularity') {
      setViewsWithRanks(
        data.map((view, index) => ({ ...view, rank: index + 1 })),
      );
    } else if (sortBy === 'alphabetical') {
      setViewsWithRanks((v) => {
        const c = [...v];
        return c.sort((a, b) => {
          const titleA = a.item?.title || '';
          const titleB = b.item?.title || '';
          return titleA.localeCompare(titleB);
        });
      });
    }
  }, [sortBy]);

  return (
    <div>
      <div className="flex mt-12 justify-between items-center flex-wrap gap-2">
        <h2 className="text-2xl font-bold mb-0 mt-0 whitespace-nowrap">
          {props.title}
        </h2>
        <div className="flex">
          <Button
            size="md"
            outlined
            color="primary"
            rounded="left"
            active={sortBy === 'alphabetical'}
            onClick={() => setSortBy('alphabetical')}
          >
            Alphabetical
          </Button>
          <Button
            size="md"
            outlined
            color="primary"
            rounded="right"
            active={sortBy === 'popularity'}
            onClick={() => setSortBy('popularity')}
          >
            Popularity
          </Button>
        </div>
      </div>
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
    </div>
  );
}
