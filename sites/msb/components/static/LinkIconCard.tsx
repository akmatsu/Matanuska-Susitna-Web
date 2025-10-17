import clsx from 'clsx';
import Link from 'next/link';
import { Surface, SurfaceIconWrapper } from './Surface';
import { Icon } from './Icon';
import { Avatar } from './Avatar';
import { Text } from '@matsugov/ui/Text';

export function LinkIconCard(props: {
  href: string;
  icon?: string | null;
  title?: string | null;
  description?: string | null;
  className?: string;
}) {
  return (
    <Surface
      as={Link}
      href={props.href}
      className={clsx('flex flex-col sm:flex-row gap-3', props.className)}
    >
      <SurfaceIconWrapper>
        <Avatar color="primary">
          <Icon name={props.icon} color="white" size="xl" />
        </Avatar>
      </SurfaceIconWrapper>
      <div className="p-4">
        <Text
          color="primary"
          type="card-header"
          className="group-hover:text-primary-dark"
        >
          {props.title}
        </Text>
        <p>{props.description}</p>
      </div>
    </Surface>
  );
}
