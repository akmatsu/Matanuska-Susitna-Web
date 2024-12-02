'use client';
import { Button } from '@headlessui/react';
import { AccordionItemProps, AccordionProps } from './types';
import { useState } from 'react';
import clsx from 'clsx';

export function Accordion(props: AccordionProps) {
  return <div className="space-y-2 w-full">{props.children}</div>;
}

export function AccordionItem(props: AccordionItemProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="w-full">
      <h4 className="relative">
        <Button
          id={`button-${props.title}`}
          aria-expanded={false}
          aria-controls={`accordion-panel-${props.title}`}
          className="group flex items-center py-4 px-5 bg-gray-5 hover:bg-gray-10 font-bold focus:outline focus:outline-4 focus:outline-blue-40v cursor-pointer text-left gap-3 w-full"
          onClick={() => setExpanded((val) => !val)}
        >
          {props.title}
          <div className="h-full flex items-center ml-auto shrink-0">
            <span
              className={clsx('size-6 ', {
                'icon-[bi--plus]': !expanded,
                'icon-[bi--dash]': expanded,
              })}
            ></span>
          </div>
        </Button>
      </h4>
      <div
        className="py-6 px-4 [&[hidden]]:p-0"
        role="region"
        aria-labelledby={`button-${props.title}`}
        hidden={!expanded}
        id={`accordion-panel-${props.title}`}
      >
        <div className="max-w-prose leading-normal">{props.children}</div>
      </div>
    </div>
  );
}
