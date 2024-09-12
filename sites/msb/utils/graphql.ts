const API_URL = process.env.API_URL || 'http://localhost:3333/api/graphql';

export const gql = ([content]: TemplateStringsArray) => content;

export async function fetchGraphQL(
  query: string,
  variables?: Record<string, any>,
) {
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify({ query, variables }),
      headers: { 'Content-Type': 'application/json' },
    });

    const resJson = res.json();
    return resJson;
  } catch (err: any) {
    throw new Error(`GraphQL errors occurred\n${err.message}`);
  }
}
