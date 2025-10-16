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
    // <Link
    //   href={props.href}
    //   className={clsx(
    //     'flex flex-col md:flex-row gap-3 col-span-1 w-full text-black no-underline group rounded transition-colors border border-base-light hover:border-base h-full',
    //     props.className,
    //   )}
    // >
    //   <div className="h-fit md:h-full bg-base-lightest w-full md:w-fit flex justify-center items-center p-4">
    //     <div className="aspect-square size-20 rounded-full bg-primary group-hover:bg-primary-dark justify-center items-center flex transition-colors">
    //       <span className={clsx('text-white size-12', props.icon)} />
    //     </div>
    //   </div>
    //   <div className="p-4">
    //     <h3 className="text-xl font-semibold text-primary group-hover:text-primary-dark transition-colors">
    //       {props.title}
    //     </h3>
    //     <p>{props.description}</p>
    //   </div>
    // </Link>
    <Link
      href={props.href}
      className={clsx(
        'flex flex-row gap-3 w-full text-black no-underline group rounded transition-colors border border-base-light hover:border-base h-full',
        props.className,
      )}
    >
      <div className="h-full bg-base-lightest w-full md:w-fit flex justify-center items-center p-4">
        <div className="aspect-square size-20 rounded-full bg-primary group-hover:bg-primary-dark justify-center items-center flex transition-colors">
          <span className={clsx('text-white size-12', props.icon)} />
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-primary group-hover:text-primary-dark transition-colors">
          {props.title}
        </h3>
        <p>{props.description}</p>
      </div>
    </Link>
  );
}
