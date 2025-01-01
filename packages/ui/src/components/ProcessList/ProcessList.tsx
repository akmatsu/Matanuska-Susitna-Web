import clsx from 'clsx';

export function ProcessList({ children }: { children?: React.ReactNode }) {
  return (
    <ol className="list-none pr-0 m-0 pl-4 pt-5 [counter-reset:process-list] relative">
      {children}
    </ol>
  );
}

export function ProcessListItem({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <li
      className={clsx(
        // list-item:before styles
        'before:content-[counter(process-list,decimal)]',
        'before:[counter-increment:process-list]',
        'before:text-lg',
        'before:font-bold',
        'before:bg-white',
        'before:border-[.25rem]',
        'before:rounded-full',
        'before:flex',
        'before:justify-center',
        'before:items-center',
        'before:w-[2.5rem]',
        'before:h-[2.5rem]',
        'before:border-base-darkest',
        'before:size-10',
        'before:absolute',
        'before:left-0',
        'before:[box-shadow:0_0_0_0.25rem_#fff]',
        'before:-mt-[0.4rem]',

        // list-item styles
        'border-l-[0.5rem]',
        'border-blue-10v',
        'last:border-transparent',
        'pl-[calc(calc(2.5rem/2-.25rem)*2)]',
        'pb-8',
        'prose',
      )}
    >
      <h4 className="text-xl font-bold m-0">{title}</h4>
      {children}
    </li>
  );
}
