'use client';

import { Button } from '@matsugov/ui';
import {
  useCurrentRefinements,
  type CurrentRefinementsProps,
} from 'react-instantsearch';
import v from 'voca';

export function CoreCurrentRefinements(props: CurrentRefinementsProps) {
  const { items, refine } = useCurrentRefinements(props);
  if (!items?.length) return null;
  return (
    <div className="relative -mx-4">
      <div className="absolute mask-r-from-0% h-full w-4 top-0 left-0 bg-white pointer-events-none"></div>
      <div className="absolute mask-l-from-0% h-full w-4 top-0 right-0 bg-white pointer-events-none"></div>
      <div className="overflow-x-auto px-4 pb-4 pt-2">
        <div className="flex gap-2 items-center">
          {items.map((item) => {
            return item.refinements.map((refinement) => (
              <Button
                size="xs"
                color="base-light"
                shadow={false}
                key={refinement.label}
                className="after:icon-[mdi--close] after:ml-1 after:size-3 text-nowrap"
                onClick={() => refine(refinement)}
                title={`Remove ${v.replace(v.titleCase(item.label), /_|-/g, ' ')}: ${v.replace(v.titleCase(refinement.label), /_|-/g, ' ')}`}
              >
                {v.replace(v.titleCase(item.label), /_|-/g, ' ')}:{' '}
                {v.replace(v.titleCase(refinement.label), /_|-/g, ' ')} (
                {refinement.count})
              </Button>
            ));
          })}
        </div>
      </div>
    </div>
  );
}
