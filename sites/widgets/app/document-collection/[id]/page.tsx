import { getClient } from '@/utils';
import { DocumentCollection } from '@matsugov/ui';
import { GET_DOC_COLLECTION_QUERY } from '@msb/js-sdk';
import Link from 'next/link';

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
        <DocumentCollection
          linkAs={Link}
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
