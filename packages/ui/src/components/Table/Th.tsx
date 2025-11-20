import clsx from 'clsx';

export function Th({ className, ...props }: React.ComponentProps<'th'>) {
  return (
    <th
      className={clsx(
        'border border-base-light py-1 px-4 text-left',
        className,
      )}
      {...props}
    />
  );
}
