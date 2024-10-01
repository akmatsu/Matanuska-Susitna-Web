const api_url = `${process.env.NEXT_PUBLIC_API_URL}/api/graphql`;
export const gql = ([content]: TemplateStringsArray) => content;

export async function fetchGraphQL<T = any>(
  query: string,
  variables?: Record<string, any>,
): Promise<T | undefined> {
  try {
    const res = await fetch(api_url, {
      method: 'POST',
      body: JSON.stringify({ query, variables }),
      headers: { 'Content-Type': 'application/json' },
    });

    const resJson = res.json();
    return resJson;
  } catch (err: any) {
    // throw new Error(`GraphQL errors occurred\n${err.message}`);
    console.error(err.message);
  }
}
