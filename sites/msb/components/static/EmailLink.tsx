import { ComponentProps } from 'react';
import { Link } from './Link';
import { EmailLink as UIEmailLink } from '@matsugov/ui/EmailLink';

export function EmailLink(
  props: Omit<ComponentProps<typeof UIEmailLink>, 'as'>,
) {
  return <UIEmailLink as={Link} {...props} />;
}
