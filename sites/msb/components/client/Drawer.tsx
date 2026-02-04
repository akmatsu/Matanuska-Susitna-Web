'use client';

import { useSideNavDrawer } from '@/hooks/SideNavDrawerContext';
import clsx from 'clsx';
import { type ReactNode } from 'react';

type DrawerRenderHelpers = {
  open: () => void;
  close: () => void;
};

type DrawerRenderable =
  | ReactNode
  | ((helpers: DrawerRenderHelpers) => ReactNode);

type DrawerProps = {
  /** Accessible title announced by assistive tech */
  title?: string;
  /** Control where the panel originates */
  placement?: 'left' | 'right';
  /** Width preset for the panel */
  width?: 'sm' | 'md' | 'lg';

  /** Content rendered inside the panel */
  children: DrawerRenderable;
  /** Accessible label for the close button */
  closeLabel?: string;
};

const WIDTH_MAP: Record<NonNullable<DrawerProps['width']>, string> = {
  sm: 'w-64',
  md: 'w-80',
  lg: 'w-96',
};

export function Drawer({
  title = 'Panel',
  placement = 'right',
  width = 'md',
  children,
  closeLabel = 'Close panel',
}: DrawerProps) {
  const { isOpen, open, close, panelRef } = useSideNavDrawer();

  const renderedChildren =
    typeof children === 'function'
      ? (children as (helpers: DrawerRenderHelpers) => ReactNode)({
          open,
          close,
        })
      : children;

  return (
    <>
      <div
        className={clsx(
          'fixed inset-0 z-50 flex',
          placement === 'right' ? 'justify-end' : 'justify-start',
          isOpen ? 'pointer-events-auto' : 'pointer-events-none',
        )}
        aria-hidden={!isOpen}
      >
        <div
          className={clsx(
            'absolute inset-0 bg-black/50 transition-opacity duration-200',
            isOpen ? 'opacity-100' : 'opacity-0',
          )}
          onClick={close}
        />
        <section
          role="dialog"
          aria-modal="true"
          aria-label={title}
          ref={panelRef}
          tabIndex={-1}
          className={clsx(
            'relative z-10 flex h-full flex-col bg-white shadow-xl transition-transform duration-300 focus:outline-none',
            WIDTH_MAP[width],
            placement === 'right'
              ? isOpen
                ? 'translate-x-0'
                : 'translate-x-full'
              : isOpen
                ? 'translate-x-0'
                : '-translate-x-full',
          )}
        >
          <div className="flex items-center justify-between border-b border-base-light px-4 py-3">
            <p className="font-semibold text-base-darker">{title}</p>
            <button
              type="button"
              onClick={close}
              className="size-8 rounded-xs bg-primary text-white hover:bg-primary-dark active:bg-primary-darker flex items-center justify-center focus-ring"
              aria-label={closeLabel}
            >
              <span
                className="icon-[mdi--close] size-4"
                aria-hidden="true"
              ></span>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-4 py-4">
            {renderedChildren}
          </div>
        </section>
      </div>
    </>
  );
}
