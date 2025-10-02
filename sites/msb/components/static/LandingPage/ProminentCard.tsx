import clsx from 'clsx';
import { Link } from '../Link';
import { Text } from '@matsugov/ui/Text';

export function DarkFlatCard(props: {
  title: string;
  href: string;
  icon?: string | null;
  description?: string | null;
  className?: string;
}) {
  return (
    <Link
      href={props.href}
      className={clsx(
        'flex gap-3 max-w-xs text-white no-underline group hover:bg-white/3 p-2 rounded transition-colors',
        props.className,
      )}
    >
      <div>
        <div className="aspect-square size-20 p-4 rounded-full bg-primary justify-center items-center flex">
          <span className={clsx('size-full', props.icon)} />
        </div>
      </div>
      <div>
        <Text type="heading3" color="secondary">
          {props.title}
        </Text>
        {props.description && <p className="text-white">{props.description}</p>}
      </div>
    </Link>
  );
}
