import clsx from 'clsx';

export function Thr({ className, ...props }: React.ComponentProps<'tr'>) {
  return <tr className={clsx('bg-neutral-200', className)} {...props} />;
}
