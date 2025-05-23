import { LinkButton } from '@/components/static/LinkButton';
import { getClient } from '@/utils/apollo/ApolloClient';
import { Card, CardHeader, CardTitle } from '@matsugov/ui/Card';
import { GetBoardsQuery } from '@msb/js-sdk/graphql';
import { GET_BOARDS } from '@msb/js-sdk';
import Link from 'next/link';
import { BoardsListFilter } from './BoardListFilter';

export async function BoardsList({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { data, error } = await getClient().query({
    query: GET_BOARDS,
    variables: {
      where: {
        type:
          typeof searchParams.type === 'string'
            ? {
                equals: searchParams.type,
              }
            : undefined,
      },
    },
  });

  if (error) {
    console.error('Error fetching boards:', error);
    return;
  }

  const { boards } = data as GetBoardsQuery;

  return (
    <Card>
      <CardHeader className="flex gap-2 justify-between items-center">
        <CardTitle>List of Boards</CardTitle>
        <LinkButton href="https://matsugov.us/publicmeetings">
          View the Public Meetings Calendar
        </LinkButton>
      </CardHeader>

      <BoardsListFilter
        types={[
          { label: 'Board', value: 'board' },
          { label: 'Community Council', value: 'community_council' },
          { label: 'SSA Board', value: 'ssa_board' },
          { label: 'FSA Board', value: 'fsa_board' },
          { label: 'RSA Board', value: 'rsa_board' },
          { label: 'Other', value: 'other' },
        ]}
      />

      <table className="border-collapse table-auto">
        <thead>
          <tr className="bg-neutral-200">
            <th className="border border-base-light py-1 px-4">Name</th>
            <th className="border border-base-light py-1 px-4">
              Meeting Schedule
            </th>
            <th className="border border-base-light py-1 px-4">Description</th>
          </tr>
        </thead>
        <tbody>
          {boards?.map((board) => (
            <tr key={board.id} className="not-odd:bg-neutral-100">
              <td className="border border-base-lighter px-4 py-2">
                <Link href={`/boards/${board.slug}`} as={`/boards/${board.id}`}>
                  {board.title}
                </Link>
              </td>
              <td className="border border-base-lighter px-4 py-2">
                {board.meetingSchedule}
              </td>
              <td className="border border-base-lighter px-4 py-2 truncate overflow-hidden max-w-2xs">
                {board.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
