import { Button, type ButtonProps } from '@matsugov/ui/Button';
import { Link } from '../Link';

type LinkAs = typeof Link;

export type LinkButtonProps = Omit<ButtonProps<LinkAs>, 'as'> & {
  href: string;
};

export function LinkButton({ children, href, ...props }: LinkButtonProps) {
  return (
    <Button as={Link} href={href} {...props}>
      {children}
    </Button>
  );
}
