import { getClient } from '@/utils/apollo/ApolloClient';
import { GET_DOC_COLLECTION_QUERY } from '@/utils/apollo/queries/getDocCollection';
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
    <div className="border" style={{ borderCollapse: 'collapse' }}>
      <div className="border-bottom padding-105 bg-base-lighter">
        <h4>{data?.documentCollection.title}</h4>
      </div>
      <ul className="usa-list--unstyled">
        {data?.documentCollection.documents.map((doc, index) => (
          <li
            key={doc.id}
            className={`${
              index !== data?.documentCollection.documents.length - 1
                ? 'border-bottom'
                : ''
            } padding-105`}
          >
            <Link href={doc.file.url}>{doc.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// This wrapper is for type safety when adding this component to React Markdown Components.
export function DocCollectionWrapper({ id }: { id: string }) {
  return <DocCollection id={id} />;
}
