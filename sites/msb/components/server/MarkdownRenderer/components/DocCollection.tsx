import { DocumentLink } from '@/components/static/DocumentLink';
import { getClient } from '@/utils/apollo/ApolloClient';
import { gql } from '@msb/js-sdk/gql';

const getDocCollection = gql(`
  query GetDocumentCollection($where: DocumentCollectionWhereUniqueInput!) {
    documentCollection(where: $where) {
      id
      title
      documents {
        id
        ...DocumentLink
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
            <td>
              <DocumentLink data={doc} />
            </td>
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
