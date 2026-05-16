import clsx from 'clsx';

export function Th({ className, ...props }: React.ComponentProps<'th'>) {
  return (
    <th
      className={clsx(
        'border-msb-base-light border px-4 py-1 text-left',
        className,
      )}
      {...props}
    />
  );
}
