'use client';

import clsx from 'clsx';
import { useState } from 'react';
import { Drawer } from '@/components/client/Drawer';
import { SideNav } from '@/components/client/sideNav';

type SideNavDrawerProps = {
  className?: string;
  hideOnDesktop?: boolean;
};

export function SideNavDrawer({
  className,
  hideOnDesktop = true,
}: SideNavDrawerProps) {
  const [hasHeadings, setHasHeadings] = useState(false);

  return (
    <div
      className={clsx(
        hideOnDesktop && 'lg:hidden',
        !hasHeadings && 'hidden',
        className,
      )}
    >
      <Drawer title="On This Page" placement="left">
        {({ close }) => (
          <div className="p-2">
            <SideNav onNavigate={close} onHeadingsChange={setHasHeadings} />
          </div>
        )}
      </Drawer>
    </div>
  );
}
