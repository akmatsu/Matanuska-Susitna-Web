import { getClient } from '@/utils/apollo/ApolloClient';
import {
  DocumentNode,
  OperationVariables,
  TypedDocumentNode,
} from '@apollo/client';
import { SearchListItem } from './SearchListItem';
import { CorePagination } from '../CorePagination';

export async function SearchList({
  limit = 15,
  page = 1,
  search = '',
  title = 'List',
  query,
  listKey,
}: {
  limit?: number;
  page?: number;
  search?: string;
  query: DocumentNode | TypedDocumentNode<any, OperationVariables>;
  listKey: string;
  title?: string;
}) {
  const { data } = await getClient().query({
    query,
    variables: {
      take: limit,
      skip: (page - 1) * limit,
      where: {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ],
      },
    },
  });

  return (
    <>
      <h1>{title}</h1>
      {data[listKey]?.length ? (
        <>
          <ul className="usa-list--usa-list--unstyled">
            {data[listKey].map(
              (item: { slug: string; title: string; description: string }) => (
                <SearchListItem item={item} listKey={listKey} />
              ),
            )}
          </ul>
          <CorePagination
            currentPage={1}
            totalPages={Math.ceil(data[`${listKey}Count`] / limit)}
          />
        </>
      ) : (
        <p>No Results.</p>
      )}
    </>
  );
}
