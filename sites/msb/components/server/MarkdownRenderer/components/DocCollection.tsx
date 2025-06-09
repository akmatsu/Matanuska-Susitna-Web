import { getClient } from '@/utils/apollo/ApolloClient';
import { GET_DOC_COLLECTION_QUERY } from '@msb/js-sdk/getDocCollection';
import Link from 'next/link';

export async function DocCollection({ id }: { id: string }) {
  const { data } = await getClient().query({
    query: GET_DOC_COLLECTION_QUERY,
    variables: {
      where: {
        id,
      },
    },
  });
  return (
    <table>
      <thead>
        <tr>
          <th>
            <span>{data?.documentCollection?.title}</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {data?.documentCollection?.documents?.map((doc) => (
          <tr key={doc.id}>
            {doc.file?.url && doc.title && (
              <td>
                <Link href={doc.file.url}>{doc.title}</Link>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// This wrapper is for type safety when adding this component to React Markdown Components.
export function DocCollectionWrapper({ id }: { id: string }) {
  return <DocCollection id={id} />;
}
