import Link from 'next/link';
import { NavLinkProps } from './types';

export function NavLink({ className = '', ...props }: NavLinkProps) {
  const classes = className + ' usa-nav__link';
  return <Link {...props} className={classes} />;
}
