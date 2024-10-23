import React, { useEffect } from 'react';
import { useNodeViewContext } from '@prosemirror-adapter/react';
import { gql, useQuery } from '@keystone-6/core/admin-ui/apollo';

export function IframeView() {
  const { contentRef, node } = useNodeViewContext();
  useEffect(() => {
    console.log(node);
  });
  // const { data, refetch } = useQuery(
  //   gql`
  //     query DocumentCollections($where: DocumentCollectionWhereInput!) {
  //       documentCollection(where: $where) {
  //         documents {
  //           title
  //           id
  //           file {
  //             url
  //             filename
  //             filesize
  //           }
  //         }
  //         id
  //         title
  //       }
  //     }
  //   `,
  //   {
  //     variables: {
  //       where: {
  //         id: node.attrs.id,
  //       },
  //     },
  //   },
  // );

  return (
    <div ref={contentRef} id={node.attrs.id}>
      Doc Collection! {node.attrs.id}
    </div>
  );
}
