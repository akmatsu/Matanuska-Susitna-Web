import { getClient } from '@/utils';
import { DocumentCollection } from '@matsugov/ui';
import { GET_DOC_COLLECTION_QUERY } from '@msb/js-sdk';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data, loading, error } = await getClient().query({
    query: GET_DOC_COLLECTION_QUERY,
    variables: {
      where: {
        id: id,
      },
    },
  });

  if (error) {
    console.error(error);

    return <div className="w-screen h-screen">{error.message}</div>;
  }

  return (
    <div className="w-screen h-screen">
      {loading ? (
        <p>Loading...</p>
      ) : data.documentCollection ? (
        <DocumentCollection collection={data.documentCollection} />
      ) : (
        <p>Not Found</p>
      )}
    </div>
  );
}
