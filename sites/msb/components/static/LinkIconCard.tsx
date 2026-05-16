import clsx from 'clsx';
import Link from 'next/link';

export function LinkIconCard(props: {
  href: string;
  icon?: string | null;
  title?: string | null;
  description?: string | null;
  className?: string;
}) {
  return (
    <Link
      href={props.href}
      className={clsx(
        'group border-msb-base-lighter hover:border-msb-base-light col-span-1 flex w-full flex-col gap-3 overflow-hidden rounded border text-black no-underline transition-colors md:flex-row',
        props.className,
      )}
    >
      <div className="bg-msb-base-lightest flex h-fit w-full items-center justify-center p-4 md:h-full md:w-fit">
        <div className="bg-primary group-hover:bg-primary-dark flex aspect-square size-20 items-center justify-center rounded-full p-4 transition-colors">
          <span className={clsx('size-full text-white', props.icon)} />
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-primary group-hover:text-primary-dark transitions-colors text-xl font-semibold">
          {props.title}
        </h3>
        <p>{props.description}</p>
      </div>
    </Link>
  );
}
