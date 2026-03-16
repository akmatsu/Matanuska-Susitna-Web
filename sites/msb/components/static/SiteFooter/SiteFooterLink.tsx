import { FooterLink } from '@matsugov/ui';
import { ComponentProps } from 'react';
import { Link } from '../Link';

export function SiteFooterLink(props: ComponentProps<typeof FooterLink>) {
  return <FooterLink as={Link} {...props} />;
}
