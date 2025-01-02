import { ComponentProps } from 'react';
import { Button } from '@matsugov/ui';
import Link from 'next/link';

export function LinkButton({
  children,
  href,
  ...props
}: ComponentProps<typeof Button> & {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <Button as={Link} href={href} {...props}>
      {children}
    </Button>
  );
}
