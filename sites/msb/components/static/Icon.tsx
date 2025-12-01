import clsx from 'clsx';

export interface IconProps {
  name?: string | null;
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'white' | 'black';
}

export function Icon({ ...props }: IconProps) {
  return (
    <span
      className={clsx(
        props.name,
        {
          'text-primary': props.color === 'primary',
          'text-secondary': props.color === 'secondary',
          'text-white': props.color === 'white',
          'text-black': props.color === 'black',
          'size-4': props.size === 'xs',
          'size-6': props.size === 'sm',
          'size-8': props.size === 'md',
          'size-10': props.size === 'lg',
          'size-12': props.size === 'xl',
        },
        props.className,
      )}
    ></span>
  );
}
