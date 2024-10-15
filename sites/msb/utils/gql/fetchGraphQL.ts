const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface GraphQLQuery<TData = any, TVariables = any> {
  data: TData;
  variables: TVariables;
}

export function gql<
  TData = { [key: string]: any },
  TVariables = { [key: string]: any },
>(
  strings: TemplateStringsArray,
): {
  query: string;
  __typename: GraphQLQuery;
} {
  return {
    query: strings[0],
    __typename: {} as GraphQLQuery<TData, TVariables>,
  };
}

export async function fetchGraphQL<
  T extends {
    query: string;
    __typename: GraphQLQuery;
  },
>(
  gqlQuery: T,
  variables?: T['__typename']['variables'],
  log?: boolean,
): Promise<T['__typename']['data'] | undefined> {
  if (log) console.log(gqlQuery, variables);
  try {
    const res = await fetch(`${API_URL}/api/graphql`, {
      method: 'POST',
      body: JSON.stringify({ query: gqlQuery.query, variables }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (log) console.log(res);

    const resJson = await res.json();
    return resJson.data as T['__typename']['data'];
  } catch (err: any) {
    // throw new Error(`GraphQL errors occurred\n${err.message}`);
    console.error(err.message);
  }
}
