'use client';
import { Icon } from '@trussworks/react-uswds';

export function CoreIcon(props: {
  icon: keyof typeof Icon;
  size?: 3 | 4 | 5 | 6 | 7 | 8 | 9;
  className?: string;
  color?: string;
  ariaLabel?: string;
}) {
  const IconComp = Icon[props.icon] as (typeof Icon)['Add'];
  const ariaLabel = props.ariaLabel || 'Icon';

  return (
    <IconComp
      size={props.size}
      className={props.className}
      aria-label={ariaLabel}
      color={props.color}
    />
  );
}
