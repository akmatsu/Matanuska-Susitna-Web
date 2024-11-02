import { getClient } from '@/utils/apollo/ApolloClient';
import { GET_DOC_COLLECTION_QUERY } from '@/utils/apollo/queries/getDocCollection';
import Link from 'next/link';

// TODO! Finish working on UI for document collections!

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
    <div>
      <h4>{data?.documentCollection.title}</h4>
      <ul>
        {data?.documentCollection.documents.map((doc) => (
          <li key={doc.id}>
            <Link href={doc.file.url}>{doc.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
