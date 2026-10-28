import Link from 'next/link';
import { Notice } from '@/components/Notice';
import { propertyAccessBaseUrl } from '@/utils/propertyAccess';

/**
 * Tells users about the Property Access preview. Links to the Property Access
 * home page unless `href` points somewhere more specific.
 */
export function PropertyAccessNotice(props: {
  href?: string;
  className?: string;
}) {
  return (
    <Notice className={props.className}>
      The Borough has upgraded the Tax &amp; Assessment system that supplies
      MyProperty&apos;s data. In addition to MyProperty, we are previewing a new
      tool:{' '}
      <Link href={props.href ?? propertyAccessBaseUrl}>Property Access</Link>.
    </Notice>
  );
}
