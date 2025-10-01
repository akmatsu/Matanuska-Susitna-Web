import { InstantSearchNext } from 'react-instantsearch-nextjs';
import TypesenseInstantsearchAdapter from 'typesense-instantsearch-adapter';

const typesenseInstantSearchAdapter = new TypesenseInstantsearchAdapter({
  server: {
    apiKey: process.env.NEXT_PUBLIC_TYPESENSE_API_KEY || 'xyz',
    nodes: [
      {
        host: process.env.NEXT_PUBLIC_TYPESENSE_HOST || 'localhost',
        port: process.env.NEXT_PUBLIC_TYPESENSE_PORT
          ? parseInt(process.env.NEXT_PUBLIC_TYPESENSE_PORT)
          : 8108,
        protocol: process.env.NEXT_PUBLIC_TYPESENSE_PROTOCOL || 'http',
      },
    ],
  },
  additionalSearchParameters: {
    num_typos: 5,
    query_by: 'title,description,body',
    sort_by: '_text_match:desc,title:asc',
    query_by_weights: '4,2,1',
    text_match_type: 'max_weight',
    split_join_tokens: 'always',
  },
});

const searchClient = typesenseInstantSearchAdapter.searchClient;

export function InstantSearchWrapper(props: {
  indexName: string;
  routing?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <InstantSearchNext
      searchClient={searchClient}
      indexName={props.indexName}
      routing={
        props.routing ? { router: { cleanUrlOnDispose: true } } : undefined
      }
      future={{
        preserveSharedStateOnUnmount: true,
      }}
    >
      {props.children}
    </InstantSearchNext>
  );
}
