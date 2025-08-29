'use client';
import { RefinementListDropdown } from '@/components/static/search/RefinementListDropdown';
import { CoreSearchBox } from './CoreSearchBox';
import {
  CoreSearchHits,
  CoreSearchPagination,
  InstantSearchWrapper,
} from '@/components/static/search';
import { CoreCurrentRefinements } from './CoreCurrentRefinements';

export function InstantSearch() {
  return (
    <InstantSearchWrapper indexName="pages" routing>
      <h1 className="text-3xl font-bold mb-4">Search</h1>
      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-3 flex flex-col gap-4">
          <div>
            <CoreSearchBox />
            <section className="flex gap-2 overflow-auto py-4 items-center">
              <RefinementListDropdown
                attribute="type"
                title="Type"
                sortBy={['name', 'count']}
                limit={50}
                showMoreLimit={1000}
                showMore
              />
              <RefinementListDropdown
                attribute="districts"
                title="Districts"
                sortBy={['name', 'count']}
                showMore
              />
              <RefinementListDropdown
                attribute="tags"
                title="Tags"
                sortBy={['name', 'count']}
                showMore
              />
              <RefinementListDropdown
                attribute="communities"
                title="Communities"
                sortBy={['name', 'count']}
                showMore
              />
            </section>
            <CoreCurrentRefinements />
            <section>
              <CoreSearchHits />
            </section>
          </div>
          <CoreSearchPagination />
        </div>
      </div>
    </InstantSearchWrapper>
  );
}
