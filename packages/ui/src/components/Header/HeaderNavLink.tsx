import clsx from 'clsx';

export function NavLink<As extends React.ElementType = 'a'>({
  as,
  className,
  ...props
}: { as?: As } & React.ComponentProps<As>) {
  const Tag = as || 'a';
  return (
    <Tag
      className={clsx(
        'text-base-darker hover:border-primary hover:text-primary block py-2 text-sm font-bold no-underline transition-colors hover:border-b-4 lg:py-4',
        className,
      )}
      {...props}
    />
  );
}
