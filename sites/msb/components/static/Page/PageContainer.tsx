import { Breadcrumbs } from '@/components/client/breadcrumbs';
import { SideNav } from '@/components/client/sideNav';
import { SideNavDrawer } from '@/components/client/SideNavDrawer';
import clsx from 'clsx';
import React from 'react';

export function PageContainer<T extends React.ElementType>({
  ...props
}: {
  children: React.ReactNode;
  className?: string;

  /** The HTML element to render as defaults to 'div' */
  as?: T;

  /** The maximum width of the container */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

  /** The breakpoint at which the container's max-width changes */
  breakPoint?: 'sm' | 'md' | 'lg' | 'xl';

  /** Whether to hide the breadcrumbs element */
  hideBreadcrumbs?: boolean;

  /** Whether to hide the side navigation */
  hideSideNav?: boolean;
}) {
  const Tag = props.as || 'div';
  const shouldShowSideNav = !props.hideSideNav;
  return (
    <Tag
      className={clsx(
        'mx-auto px-4 py-4 lg:w-full',
        {
          'max-w-screen-2xl': !props.hideSideNav,
          'max-w-5xl': props.hideSideNav,
        },

        props.className,
      )}
    >
      {shouldShowSideNav && <SideNavDrawer className="mb-4" />}

      <div
        className={clsx(
          shouldShowSideNav && 'md:grid md:grid-cols-14 md:gap-8',
        )}
      >
        {shouldShowSideNav && (
          <aside className="relative hidden md:flex md:flex-col md:items-end md:col-span-3 w-full">
            <div className="sticky top-4 w-full">
              <SideNav />
            </div>
          </aside>
        )}

        <div className={clsx('md:col-span-11 w-full')}>
          {!props.hideBreadcrumbs && <Breadcrumbs />}

          {props.children}
        </div>
      </div>
    </Tag>
  );
}
