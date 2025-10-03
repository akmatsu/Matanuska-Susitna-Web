import clsx from 'clsx';
import { Link } from '../Link';
import { Text } from '@matsugov/ui/Text';

export function DarkFlatCard({
  maxWith = 'sm',
  ...props
}: {
  title: string;
  href: string;
  icon?: string | null;
  description?: string | null;
  className?: string;
  light?: boolean;
  vertical?: boolean;
  maxWith?: 'sm' | 'md' | 'lg';
}) {
  return (
    <Link
      href={props.href}
      className={clsx(
        'flex gap-3 no-underline group hover:bg-white/3 p-2 rounded transition-colors not-prose',
        {
          'text-white': !props.light,
          'text-black': props.light,
          'flex-col justify-center items-center': props.vertical,
          'max-w-xs': maxWith === 'sm',
          'max-w-sm': maxWith === 'md',
          'max-w-md': maxWith === 'lg',
        },
        props.className,
      )}
    >
      <div>
        <div className="aspect-square size-20 p-4 rounded-full bg-primary justify-center items-center flex">
          <span className={clsx('size-full text-white', props.icon)} />
        </div>
      </div>
      <div>
        <Text type="heading3" color={props.light ? 'dark' : 'secondary'}>
          {props.title}
        </Text>
        {props.description && <Text type="body-sm">{props.description}</Text>}
      </div>
    </Link>
  );
}
