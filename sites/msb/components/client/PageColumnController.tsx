'use client';

import clsx from 'clsx';
import React from 'react';
import { SideNav } from './sideNav';
import { useSideNavDrawer } from '@/hooks/SideNavDrawerContext';
import { Breadcrumbs } from './breadcrumbs';

export function PageColumnController<T extends React.ElementType>({
  showSideNav = true,
  showBreadCrumbs = true,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  as?: T;
  showSideNav?: boolean;
  showBreadCrumbs?: boolean;
  right?: React.ReactNode;
}) {
  const { headings } = useSideNavDrawer();
  const Tag = props.as || 'div';
  const hasLeftColumn = showSideNav && headings.length > 1;
  const hasRightColumn =
    !!props.right && React.Children.toArray(props.right).length > 0;
  const hasBothColumns = hasLeftColumn && hasRightColumn;

  return (
    <Tag
      className={clsx(
        'mx-auto px-4 py-4 lg:w-full',
        hasLeftColumn
          ? 'max-w-screen-2xl'
          : hasRightColumn
            ? 'max-w-7xl'
            : 'max-w-4xl',
      )}
    >
      <div
        className={clsx(
          hasBothColumns || hasLeftColumn
            ? 'md:grid md:grid-cols-14 md:gap-8'
            : hasRightColumn && 'lg:grid lg:grid-cols-11 lg:gap-8',
        )}
      >
        {hasLeftColumn && (
          <div
            className={clsx(
              'hidden md:flex md:flex-col md:col-span-3 w-full relative',
            )}
          >
            <SideNav />
          </div>
        )}

        <div className={clsx('md:col-span-11 lg:col-span-8 w-full')}>
          {showBreadCrumbs && <Breadcrumbs />}
          <div className="flex flex-col gap-8 w-full">{props.children}</div>
        </div>

        {hasRightColumn && (
          <div
            className={clsx(
              'hidden lg:col-span-3 lg:flex lg:flex-col lg:gap-8 w-full nav-ignore relative',
            )}
          >
            {props.right}
          </div>
        )}
      </div>
    </Tag>
  );
}
