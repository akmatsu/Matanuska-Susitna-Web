import { Button, type ButtonProps } from '@matsugov/ui/Button';
import { Link } from '../Link';

export type LinkButtonProps = Omit<ButtonProps<typeof Link>, 'asChild'>;

export function LinkButton({
  children,
  href,
  hideExternalIcon,
  ...props
}: LinkButtonProps) {
  return (
    <Button {...props} asChild>
      <Link href={href} hideExternalIcon={hideExternalIcon}>
        {children}
      </Link>
    </Button>
  );
}
