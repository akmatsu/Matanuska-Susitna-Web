import { InPageNavigation } from '@matsugov/ui/client';
import clsx from 'clsx';

export function PageSideNavController(props: {
  children: React.ReactNode;
  rightSide?: React.ReactNode;
  showSideNav?: boolean;
}) {
  return (
    <div className="grid grid-cols-12 gap-8">
      {props.showSideNav && (
        <div className="col-span-3 hidden md:block">
          <InPageNavigation />
        </div>
      )}
      <div
        className={clsx('flex flex-col gap-8 col-span-12', {
          'md:col-span-6': props.showSideNav,
          'md:col-span-8': !props.showSideNav,
        })}
      >
        {props.children}
      </div>
      <div
        className={clsx('hidden md:block', {
          'md:col-span-3': props.showSideNav,
          'md:col-span-4': !props.showSideNav,
        })}
      >
        <aside className="flex flex-col gap-8">{props.rightSide}</aside>
      </div>
    </div>
  );
}
