import { getClient } from '@/utils';
import { DocumentCollection } from '@matsugov/ui/DocumentCollection';
import { gql } from '@msb/js-sdk/gql';
import Link from 'next/link';

const getDocCollection = gql(`
  query GetDocumentCollectionWidget($where: DocumentCollectionWhereUniqueInput!) {
    documentCollection(where: $where) {
      ...DocumentCollectionDisplay
    }
  }
`);

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = await params;
  const { link_style, center_label, hide_title } = await searchParams;

  const doNotCenterLabel = center_label === 'false';
  const hideTitle = hide_title === 'true';

  const { data, error } = await getClient().query({
    query: getDocCollection,
    variables: {
      where: {
        id: id,
      },
    },
    context: {
      fetchOptions: {
        next: {
          revalidate: 60 * 5,
        },
      },
    },
  });

  if (error) {
    console.error(error);

    return <div className="h-screen w-screen">{error.message}</div>;
  }

  if (!data) {
    return <div className="h-screen w-screen">No Data</div>;
  }

  return (
    <div className="h-screen w-screen">
      {data.documentCollection ? (
        <DocumentCollection
          centerLabel={!doNotCenterLabel}
          linkStyle={link_style as 'button' | 'link' | undefined}
          collection={data.documentCollection}
          hideTitle={hideTitle}
        />
      ) : (
        <p>Not Found</p>
      )}
    </div>
  );
}
