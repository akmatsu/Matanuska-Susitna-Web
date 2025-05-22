import { LinkButton } from '@/components';
import { getClient } from '@/utils/apollo/ApolloClient';
import { Card, CardHeader, CardTitle } from '@matsugov/ui';
import { GetBoardsQuery } from '@msb/js-sdk/graphql';
import { GET_BOARDS } from '@msb/js-sdk';
import Link from 'next/link';

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

  const types = [
    { label: 'Board', value: 'board' },
    { label: 'Community Council', value: 'community_council' },
    { label: 'SSA Board', value: 'ssa_board' },
    { label: 'FSA Board', value: 'fsa_board' },
    { label: 'RSA Board', value: 'rsa_board' },
    { label: 'Other', value: 'other' },
  ];

  return (
    <Card>
      <CardHeader className="flex gap-2 justify-between items-center">
        <CardTitle>List of Boards</CardTitle>
        <LinkButton href="https://matsugov.us/publicmeetings">
          View the Public Meetings Calendar
        </LinkButton>
      </CardHeader>

      <div className="flex justify-center items-center gap-4 flex-wrap mt-4">
        {types.map((item) => (
          <LinkButton
            key={item.value}
            href={`?type=${item.value}`}
            className="text-sm"
            color="secondary"
            scroll={false}
          >
            {item.label}
          </LinkButton>
        ))}
        <LinkButton
          color="secondary"
          href={`search?${types
            .map(
              (item, index) =>
                `pages[refinementList][type][${index}]=${item.label.toLowerCase()}`,
            )
            .join('&')}`}
        >
          Search
        </LinkButton>
      </div>

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
