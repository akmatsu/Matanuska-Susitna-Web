import Link from 'next/link';
import { ReactNode } from 'react';

export type LinkCardProps = {
  children: ReactNode;
  href: string;
};

export function LinkCard(props: LinkCardProps) {
  return (
    <Link {...props} className="usa-card">
      <div className="usa-card__container">{props.children}</div>
    </Link>
  );
}
