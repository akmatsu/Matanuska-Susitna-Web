'use client';
import { toDocumentLinkData } from '@/components/static/DocumentLink';
import {
  DOC_COLLECTION_PAGE_SIZE,
  DocCollectionFrame,
} from '@/components/client/DocCollectionView';
import { useQuery } from '@msb/js-sdk/apollo';
import { gql } from '@msb/js-sdk/gql';
import { type OrderDirection } from '@msb/js-sdk/graphql';
import { useState } from 'react';

const getDocCollection = gql(`
  query GetDocumentCollection($id: ID!, $orderBy: [DocumentOrderByInput!]!, $take: Int = 7, $skip: Int = 0) {
    documentCollection(where: {
      id: $id
    }) {
      id
      title
      documents(orderBy: $orderBy, take: $take, skip: $skip) {
        id
        ...DocumentLink
      }
      documentsCount
    }
  }
`);

export function DocCollection({ id }: { id: string }) {
  const [page, setPage] = useState(1);
  const [direction, setDirection] = useState<OrderDirection>('asc');
  const take = DOC_COLLECTION_PAGE_SIZE;

  const { data } = useQuery(getDocCollection, {
    variables: {
      id,
      orderBy: {
        title: direction,
      },
      take,
      skip: (page - 1) * take,
    },
  });

  if (!data?.documentCollection) return null;
  const totalPages = Math.ceil(
    (data?.documentCollection?.documentsCount || 0) / take,
  );

  return (
    <DocCollectionFrame
      title={data.documentCollection.title}
      documents={(data.documentCollection.documents ?? []).map((doc) => ({
        id: doc.id,
        ...toDocumentLinkData(doc),
      }))}
      direction={direction}
      onToggleDirection={() =>
        setDirection(direction === 'asc' ? 'desc' : 'asc')
      }
      page={page}
      totalPages={totalPages}
      onPageChange={setPage}
    />
  );
}

// This wrapper is for type safety when adding this component to React Markdown Components.
export function DocCollectionWrapper({ id }: { id: string }) {
  return <DocCollection id={id} />;
}
