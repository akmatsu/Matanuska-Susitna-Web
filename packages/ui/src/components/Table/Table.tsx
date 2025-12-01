import clsx from 'clsx';

export function Table({
  children,
  className,
  ...props
}: React.ComponentProps<'table'>) {
  return (
    <table className={clsx('w-full border-collapse', className)} {...props}>
      {children}
    </table>
  );
}
