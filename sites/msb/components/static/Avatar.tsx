import clsx from 'clsx';

export function Avatar({
  color = 'surface-primary',
  size = 'md',
  ...props
}: {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'surface-primary' | 'white' | 'black';
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={clsx(
        'rounded-full aspect-square flex justify-center items-center transition-colors',
        {
          'size-14': size === 'xs',
          'size-16': size === 'sm',
          'size-20': size === 'md',
          'size-24': size === 'lg',
          'size-32': size === 'xl',
          'bg-primary group-hover:bg-primary-dark': color === 'primary',
          'bg-secondary group-hover:bg-secondary-dark': color === 'secondary',
          'bg-surface-primary': color === 'surface-primary',
          'bg-white': color === 'white',
          'bg-black': color === 'black',
        },
        props.className,
      )}
    >
      {props.children}
    </div>
  );
}
