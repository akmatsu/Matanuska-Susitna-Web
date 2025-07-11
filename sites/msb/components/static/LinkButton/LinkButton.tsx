import { ComponentProps } from 'react';
import { Button } from '@matsugov/ui/Button';
import { Link } from '../Link';

export function LinkButton({
  children,
  href,
  ...props
}: ComponentProps<typeof Button> & ComponentProps<typeof Link>) {
  return (
    <Button as={Link} href={href} {...props}>
      {children}
    </Button>
  );
}
