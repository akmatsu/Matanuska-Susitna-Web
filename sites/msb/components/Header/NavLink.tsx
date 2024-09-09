import Link from 'next/link';
import { ReactNode } from 'react';

export type NavLinkProps = {
  href: string;
  // key?: string | number;
  className?: string;
  children?: ReactNode;
};

export function NavLink({ className = '', ...props }: NavLinkProps) {
  const classes = className + ' usa-nav__link';
  return <Link {...props} className={classes} />;
}
