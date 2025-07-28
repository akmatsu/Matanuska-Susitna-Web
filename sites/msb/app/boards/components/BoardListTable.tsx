'use client';
import {
  DocumentLink,
  DocumentLinkButton,
} from '@/components/static/DocumentLink';
import { DataTable } from '@matsugov/ui';
import { useSuspenseQuery } from '@msb/js-sdk/apollo';
import { gql } from '@msb/js-sdk/gql';
import { OrderDirection } from '@msb/js-sdk/graphql';
import Link from 'next/link';

const getBoards = gql(`
  query GetBoards($type: String, $search: String, $direction: OrderDirection = asc) {
    boards(where: {
      AND: [
        {
          type: {
            equals: $type
          },
          isActive:  {
            equals: true
          }
        },
        {
          OR: [
            {title: {contains: $search, mode: insensitive}},
          ]
        }
      ]
    }, orderBy: {
      title: $direction
    }, ) {
      id
      title
      slug
      directory {
        ...DocumentLink
      }
    }
  }
`);

export function BoardListTable({
  type,
  direction,
  search,
}: {
  type?: string;
  direction?: OrderDirection;
  search?: string;
}) {
  const { data, error } = useSuspenseQuery(getBoards, {
    variables: {
      search,
      direction,
      type,
    },
  });

  if (error) {
    console.error('Error fetching boards:', error);
    return;
  }

  const boards = data?.boards || [];

  return (
    <DataTable
      columns={[
        {
          key: 'title',
          label: 'Name',
          cell: (value, row) => (
            <Link href={`/boards/${row.slug}`}>{row.title}</Link>
          ),
        },
        {
          key: 'directory',
          label: 'Directory',
          cell: (value, row) => (
            <DocumentLink data={row.directory}>View</DocumentLink>
          ),
        },
      ]}
      data={boards}
      noDataMessage="No results that match your criteria."
    />
  );
}
