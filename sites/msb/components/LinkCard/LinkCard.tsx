import Link from 'next/link';
import { LinkCardProps } from './types';

export function LinkCard(props: LinkCardProps) {
  return (
    <Link {...props} className={`${props.className} usa-card display-block`}>
      <div className="usa-card__container">{props.children}</div>
    </Link>
  );
}
