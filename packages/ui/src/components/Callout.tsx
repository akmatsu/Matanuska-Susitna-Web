import clsx from 'clsx';

export function Callout(props: {
  children: React.ReactNode;
  className?: string;
  color?: 'info' | 'secondary' | 'base' | 'success' | 'warning' | 'error';
  as?: React.ElementType;
}) {
  const Tag = props.as || 'div';
  return (
    <Tag
      className={clsx(
        'border-l-4 p-4 rounded-r *:first:mt-0 *:last:mb-0',
        (!props.color || props.color === 'base') &&
          'border-gray-500 bg-gray-200',
        props.color === 'info' && 'border-primary bg-blue-100',
        props.color === 'success' && 'border-success bg-green-100',
        props.color === 'warning' && 'border-warning bg-yellow-100',
        props.color === 'error' && 'border-error bg-red-100',
        props.className,
      )}
    >
      {props.children}
    </Tag>
  );
}
