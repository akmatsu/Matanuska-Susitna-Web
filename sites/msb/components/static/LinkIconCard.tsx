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
  subtitle?: string | null;
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
          className={clsx('group-hover:text-primary-dark', {
            'mb-0!': props.subtitle,
          })}
        >
          {props.title}
        </Text>
        {props.subtitle && (
          <Text type="label" className="mb-3">
            {props.subtitle}
          </Text>
        )}
        <Text type="body">{props.description}</Text>
      </div>
    </Surface>
  );
}
