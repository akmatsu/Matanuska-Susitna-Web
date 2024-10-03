import Link from 'next/link';
import { ReactNode } from 'react';

export type LinkCardProps = {
  children: ReactNode;
  href: string;
  className?: string;
};

export function LinkCard(props: LinkCardProps) {
  return (
    <Link {...props} className={`${props.className} usa-card display-block`}>
      <div className="usa-card__container">{props.children}</div>
    </Link>
  );
}
