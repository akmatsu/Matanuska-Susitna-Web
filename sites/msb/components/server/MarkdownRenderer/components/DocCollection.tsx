import { getClient } from '@/utils/apollo/ApolloClient';
import { gql } from '@msb/js-sdk/gql';
import Link from 'next/link';

const getDocCollection = gql(`
  query GetDocumentCollection($where: DocumentCollectionWhereUniqueInput!) {
    documentCollection(where: $where) {
      id
      title
      documents {
        id
        title
        file {
          url
          filename
        }
      }
    }
  }
`);

export async function DocCollection({ id }: { id: string }) {
  const { data } = await getClient().query({
    query: getDocCollection,
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
