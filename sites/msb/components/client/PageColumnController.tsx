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
        <div
          className={clsx(
            'relative hidden',
            hasLeftColumn && 'w-full md:col-span-3 md:flex md:flex-col',
          )}
        >
          <SideNav />
        </div>

        <div className={clsx('w-full md:col-span-11 lg:col-span-8')}>
          {showBreadCrumbs && <Breadcrumbs />}
          <div className="flex w-full flex-col gap-8">{props.children}</div>
        </div>

        {hasRightColumn && (
          <div
            className={clsx(
              'nav-ignore relative hidden w-full lg:col-span-3 lg:flex lg:flex-col lg:gap-8',
            )}
          >
            {props.right}
          </div>
        )}
      </div>
    </Tag>
  );
}
