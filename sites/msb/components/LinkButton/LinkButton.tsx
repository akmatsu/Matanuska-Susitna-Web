import { ComponentProps } from 'react';
import { Button } from '@matsugov/ui';
import Link, { type LinkProps } from 'next/link';

export function LinkButton({
  children,
  href,
  ...props
}: ComponentProps<typeof Button> & LinkProps) {
  return (
    <Button as={Link} href={href} {...props}>
      {children}
    </Button>
  );
}
