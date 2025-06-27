'use client';
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
        title
        file {
          url
        }
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

  const boards = data?.boards;

  return (
    <table className="border-collapse table-auto">
      <thead>
        <tr className="bg-neutral-200">
          <th className="border border-base-light py-1 px-4">Name</th>
          <th className="border border-base-light py-1 px-4">Directory</th>
        </tr>
      </thead>
      <tbody>
        {boards?.length ? (
          boards?.map((board) => (
            <tr key={board.id} className="not-odd:bg-neutral-100">
              <BoardTableData>
                <Link href={`/boards/${board.slug}`}>{board.title}</Link>
              </BoardTableData>

              <BoardTableData>
                {board.directory?.file?.url ? (
                  <Link href={board.directory.file.url}>
                    {board.directory.title}
                  </Link>
                ) : (
                  <p>
                    Please contact the Borough Clerk's Office at{' '}
                    <Link href="tel:907-861-8675">907-861-8675</Link>.
                  </p>
                )}
              </BoardTableData>
            </tr>
          ))
        ) : (
          <tr>
            <BoardTableData colSpan={2}>
              <p className="text-center text-gray-500">
                No results that match your criteria.
              </p>
            </BoardTableData>
          </tr>
        )}
      </tbody>
    </table>
  );
}

function BoardTableData(props: {
  children?: React.ReactNode;
  colSpan?: number;
}) {
  return (
    <td
      className="border border-base-lighter px-4 py-2"
      colSpan={props.colSpan}
    >
      {props.children}
    </td>
  );
}
