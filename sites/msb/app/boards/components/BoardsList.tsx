'use client';
import { LinkButton } from '@/components/static/LinkButton';
import { Card, CardHeader, CardTitle } from '@matsugov/ui/Card';
import { BoardsListFilter } from './BoardListFilter';
import { BoardListTable } from './BoardListTable';
import { Suspense, useState } from 'react';
import { BoardListLoading } from './BoardListLoading';

export function BoardsList() {
  const [type, setType] = useState<string | undefined>();
  const [search, setSearch] = useState<string | undefined>();

  return (
    <Card>
      <CardHeader className="flex gap-2 justify-between items-center">
        <CardTitle>Boards & Commissions</CardTitle>
        <LinkButton href="https://matsugov.us/publicmeetings">
          View the Public Meetings Calendar
        </LinkButton>
      </CardHeader>

      <BoardsListFilter
        onTypeChange={setType}
        onSearch={setSearch}
        currentType={type}
        types={[
          { label: 'Board', value: 'board' },
          { label: 'Community Council', value: 'community_council' },
          { label: 'FSA Board', value: 'fsa_board' },
          { label: 'RSA Board', value: 'rsa_board' },
          { label: 'SSA Board', value: 'ssa_board' },
        ]}
      />
      <Suspense fallback={<BoardListLoading />}>
        <BoardListTable type={type} search={search} />
      </Suspense>
    </Card>
  );
}
