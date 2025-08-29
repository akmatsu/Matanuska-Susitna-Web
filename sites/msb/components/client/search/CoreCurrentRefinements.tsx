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
    <div className="flex gap-2 overflow-auto pb-4 items-center">
      {items.map((item) => {
        return item.refinements.map((refinement) => (
          <Button
            size="xs"
            rounded="pill"
            color="base-light"
            shadow={false}
            key={refinement.label}
            className="after:icon-[mdi--close] after:ml-1 after:size-3"
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
  );
}
