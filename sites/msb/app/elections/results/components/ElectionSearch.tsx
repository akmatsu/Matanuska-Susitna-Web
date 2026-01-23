'use client';
import { gql } from '@msb/js-sdk/gql';
import { ElectionResultsList } from '../../components/ElectionResultsList';
import { useSuspenseQuery } from '@msb/js-sdk/apollo';
import { useState } from 'react';
import { TextField } from '@matsugov/ui/TextField';

const getResults = gql(`
  query GetResults($search: String) {
    elections(
      orderBy:  {
         electionDate: desc
      }
      where: {
        AND: [
          {
            OR: [
              { title: { contains: $search, mode: insensitive } },
              { result: { document: { title: { contains: $search, mode: insensitive } } } },
              { result: { document: { description: { contains: $search, mode: insensitive } } } }
            ]
          },
          {
            result:  {
               document: {
                  title: {
                    contains: ""
                  }
               }
            }
          }
        ]
    }) {
      id
      ...ElectionResultsList
    }
  }
`);

export function ElectionSearch() {
  const [search, setSearch] = useState('');
  const { data, error } = useSuspenseQuery(getResults, {
    variables: {
      search,
    },
  });

  if (error) {
    console.error('Error fetching election results:', error);
    return;
  }
  const results = data?.elections;

  return (
    <>
      <div className="w-full mt-4">
        <TextField
          id="search-election-results"
          placeholder="Search..."
          className="w-full"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <ElectionResultsList data={results} />
    </>
  );
}
