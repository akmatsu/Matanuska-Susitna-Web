import { InPageNavigation } from '@matsugov/ui/InPageNavigation';

export function PageSideNavController(props: {
  children: React.ReactNode;
  rightSide?: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-12 gap-8">
      <div className="col-span-3 hidden md:block">
        <InPageNavigation />
      </div>

      <div className="flex flex-col gap-8 col-span-12 md:col-span-6">
        {props.children}
      </div>
      <div className="hidden md:block md:col-span-3">
        <aside className="flex flex-col gap-8">{props.rightSide}</aside>
      </div>
    </div>
  );
}
