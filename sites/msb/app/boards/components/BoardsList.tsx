import { LinkButton } from '@/components';
import { getClient } from '@/utils/apollo/ApolloClient';
import { Card, CardHeader, CardTitle } from '@matsugov/ui';
import { GetBoardsQuery } from '@msb/js-sdk/graphql';
import Link from 'next/link';

export async function BoardsList() {
  const { GET_BOARDS } = await import('@msb/js-sdk');
  const { data, error } = await getClient().query({
    query: GET_BOARDS,
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
        <LinkButton href="https://matsugov.us/publicmeetings" color="primary">
          Notice of Public Meetings Calendar
        </LinkButton>
      </CardHeader>

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
            <Link
              href={`/boards/${board.slug}`}
              className="contents text-inherit"
            >
              <tr
                key={board.id}
                className="not-even:bg-neutral-50 hover:bg-neutral-100 transition-colors"
              >
                <td className="border border-base-lighter px-4 py-2">
                  {board.title}
                </td>
                <td className="border border-base-lighter px-4 py-2">
                  {board.meetingSchedule}
                </td>
                <td className="border border-base-lighter px-4 py-2">
                  {board.description}
                </td>
              </tr>
            </Link>
          ))}
        </tbody>
      </table>
      {/* </CardBody> */}
    </Card>
  );
}
