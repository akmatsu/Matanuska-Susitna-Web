import React, { useEffect } from 'react';
import { useNodeViewContext } from '@prosemirror-adapter/react';
import { gql, useQuery } from '@keystone-6/core/admin-ui/apollo';

export function IframeView() {
  const { contentRef, node, selected, setAttrs } = useNodeViewContext();

  const { data, refetch, loading } = useQuery(
    gql`
      query DocumentCollection($where: DocumentCollectionWhereUniqueInput!) {
        documentCollection(where: $where) {
          id
          title
          documents {
            id
            file {
              filename
              filesize
              url
            }
          }
        }
      }
    `,
    {
      variables: {
        where: {
          id: node.attrs.id || '',
        },
      },
    },
  );

  useEffect(() => {
    refetch();
  }, [node.attrs.id]);

  return (
    <>
      {selected && (
        <div>
          <button
            className="btn btn--default"
            onClick={() => setAttrs({ id: 'cm2m8yqsv000113vbdi4fq9k3' })}
          >
            Click me!
          </button>
        </div>
      )}

      {loading ? (
        <div>loading...</div>
      ) : data ? (
        <data>{data.documentCollection?.title || 'No title'}</data>
      ) : (
        <div>Collection not found</div>
      )}
    </>
  );
}
