import clsx from 'clsx';

export function Tr({ className, ...props }: React.ComponentProps<'tr'>) {
  return (
    <tr className={clsx('not-odd:bg-neutral-100', className)} {...props} />
  );
}
