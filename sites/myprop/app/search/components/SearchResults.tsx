import { getSearchParams } from '../../../utils/serverHelpers';

export async function SearchResults() {
  const { type, query } = await getSearchParams<{
    type: string;
    query: string;
  }>();

  return (
    <div>
      <h2>Search Type: {type}</h2>
      <h3>Query: {query}</h3>
    </div>
  );
}
