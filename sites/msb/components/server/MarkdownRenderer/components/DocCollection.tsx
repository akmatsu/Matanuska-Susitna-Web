'use client';
import { DocumentLink } from '@/components/static/DocumentLink';
import { Button, Pagination } from '@matsugov/ui';
import { useQuery } from '@msb/js-sdk/apollo';
import { gql } from '@msb/js-sdk/gql';
import { OrderDirection } from '@msb/js-sdk/graphql';
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
  const [direction, setDirection] = useState<OrderDirection>(
    OrderDirection.Asc,
  );
  const take = 5;

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
    <div className="border border-black not-prose">
      <div className="border-b border-black p-2 bg-base-lightest flex justify-between">
        <span className="font-semibold">{data?.documentCollection?.title}</span>
        <Button
          icon
          size="sm"
          onClick={() =>
            setDirection(
              direction === OrderDirection.Asc
                ? OrderDirection.Desc
                : OrderDirection.Asc,
            )
          }
          title="Toggle Sort"
        >
          {direction === OrderDirection.Asc ? (
            <span className="icon-[mdi--sort-alphabetical-ascending] size-6" />
          ) : (
            <span className="icon-[mdi--sort-alphabetical-descending] size-6" />
          )}
        </Button>
      </div>
      <div>
        <ul>
          {data?.documentCollection?.documents?.map((doc) => (
            <li
              key={doc.id}
              className="p-2 border-b last:border-0 border-black"
            >
              <DocumentLink data={doc} />
            </li>
          ))}
        </ul>
      </div>
      {totalPages > 1 && (
        <div className="footer p-2 flex justify-center border-t border-black">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onLinkClick={(p) => setPage(Number(p))}
            size="xs"
          />
        </div>
      )}
    </div>
  );
}

// This wrapper is for type safety when adding this component to React Markdown Components.
export function DocCollectionWrapper({ id }: { id: string }) {
  return <DocCollection id={id} />;
}
