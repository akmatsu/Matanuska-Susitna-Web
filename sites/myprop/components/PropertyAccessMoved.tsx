import Link from 'next/link';
import { PageTitle } from '@/components/PageTitle';
import { propertyAccessBaseUrl } from '@/utils/propertyAccess';

/**
 * Replaces MyProperty pages while the site winds down. Sends users to the
 * Property Access home page unless `href` points somewhere more specific.
 */
export function PropertyAccessMoved(props: { href?: string }) {
  return (
    <main className="mx-auto max-w-2xl space-y-4 text-center">
      <PageTitle title="MyProperty Has Moved!" />
      <p>
        Please visit our new Property Access website to view your assessment
        information.
      </p>
      <Link
        href={props.href ?? propertyAccessBaseUrl}
        className="msb-btn-primary mx-auto w-fit text-base"
      >
        Go to Property Access
        <span
          className="icon-[mdi--arrow-right] ml-1 size-5"
          aria-hidden="true"
        />
      </Link>
      <p className="font-bold">
        Be sure to bookmark the new Property Access page for future use.
      </p>
      <p>
        Looking for DXF &amp; PDF tax maps?{' '}
        <Link href="/taxmaps">Search Tax Maps</Link>
      </p>
      <p>
        Questions or need assistance? Please contact our{' '}
        <Link href="https://matsu.gov/departments/assessments">
          Assessments Division
        </Link>
        .
      </p>
    </main>
  );
}
