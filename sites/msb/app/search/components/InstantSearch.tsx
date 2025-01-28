'use client';

import TypesenseInstantsearchAdapter from 'typesense-instantsearch-adapter';
import { Configure, DynamicWidgets } from 'react-instantsearch';
import { InstantSearchNext } from 'react-instantsearch-nextjs';
import { ThreeColumnLayout } from '@/components/ThreeColumnLayout';
import { CoreSearchBox } from './CoreSearchBox';
import { CoreSearchHits } from './CoreSearchHit';
import { CoreSearchPagination } from './CoreSearchPagination';
import { CustomRefinementList } from './CoreRefinementList';
import { LinkButton } from '@/components/LinkButton';

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
    num_typos: 3,
    query_by: 'title,description,body,districts,tags',
    sort_by: '_text_match:desc,title:asc,published_at:desc',
  },
});

const searchClient = typesenseInstantSearchAdapter.searchClient;

export function InstantSearch() {
  return (
    <InstantSearchNext searchClient={searchClient} indexName="pages" routing>
      <ThreeColumnLayout
        left={
          <div className="flex flex-col gap-4">
            <Configure
              filters={`published_at:<=${Math.floor(Date.now() / 1000)}`}
            />
            <CoreSearchBox />
            <DynamicWidgets facets={['*']}>
              <CustomRefinementList
                attribute="type"
                title="Type"
                sortBy={['name', 'count']}
              />
              <CustomRefinementList
                attribute="districts"
                title="Districts"
                sortBy={['name', 'count']}
              />
              <CustomRefinementList
                attribute="tags"
                title="Tags"
                sortBy={['name', 'count']}
              />
            </DynamicWidgets>
          </div>
        }
        right={
          <div className="flex flex-col gap-4">
            <LinkButton href="/contact" block>
              Contact Us
            </LinkButton>
          </div>
        }
      >
        <CoreSearchHits />
        <CoreSearchPagination />
      </ThreeColumnLayout>
    </InstantSearchNext>
  );
}
