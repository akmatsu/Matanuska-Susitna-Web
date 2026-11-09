import { Tooltip } from '@matsugov/ui/Tooltip';
import { ReactNode } from 'react';

/** Shown in rich text when a link's target is missing or unpublished. */
export function BrokenLink(props: { children: ReactNode }) {
  return (
    <Tooltip
      content="Oops! Looks like this link is broken. We are working on it!"
      className="text-center"
    >
      <span className="text-error! cursor-not-allowed! line-through!">
        {props.children} <span className="icon-[mdi--error] -mb-0.5" />
      </span>
    </Tooltip>
  );
}
