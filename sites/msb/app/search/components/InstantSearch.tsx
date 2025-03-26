'use client';

import { Configure, DynamicWidgets } from 'react-instantsearch';

import { ThreeColumnLayout } from '@/components/ThreeColumnLayout';
import { CoreSearchBox } from './CoreSearchBox';
import { CoreSearchHits } from './CoreSearchHit';
import { CoreSearchPagination } from './CoreSearchPagination';
import { CustomRefinementList } from './CoreRefinementList';
import { LinkButton } from '@/components/LinkButton';
import { InstantSearchWrapper } from './InstantSearchWrapper';

export function InstantSearch() {
  return (
    <InstantSearchWrapper indexName="pages" routing>
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
              <CustomRefinementList
                attribute="departments"
                title="Departments"
                sortBy={['name', 'count']}
              />
              <CustomRefinementList
                attribute="communities"
                title="Communities"
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
    </InstantSearchWrapper>
  );
}
