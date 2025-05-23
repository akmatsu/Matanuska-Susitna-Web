'use client';
import { DynamicWidgets } from 'react-instantsearch';
import { CoreSearchBox } from './CoreSearchBox';
import {
  CoreSearchHits,
  CoreSearchPagination,
  CustomRefinementList,
  InstantSearchWrapper,
} from '@/components/static/search';
import { ThreeColumnLayout } from '@/components/static/ThreeColumnLayout';
import { LinkButton } from '@/components/static/LinkButton';

export function InstantSearch() {
  return (
    <InstantSearchWrapper indexName="pages" routing>
      <ThreeColumnLayout
        left={
          <div className="flex flex-col gap-4">
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
              <CustomRefinementList
                attribute="related_pages"
                title="Related Pages"
                sortBy={['count', 'name']}
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
