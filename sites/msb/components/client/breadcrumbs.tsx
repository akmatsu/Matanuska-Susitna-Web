'use client';

import { usePathname } from 'next/navigation';
import { Link } from '../static/Link';
import titleCase from 'voca/title_case';

export function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbItems = segments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/');
    return { label: titleCase(segment), href };
  });

  return (
    <nav>
      <ul className="flex">
        <li>
          <Link href="/">Home</Link>
          <span className="mx-2">/</span>
        </li>
        {breadcrumbItems.map((item, index) => (
          <li key={item.href}>
            {index !== breadcrumbItems.length - 1 ? (
              <>
                <Link href={item.href}>{item.label}</Link>
                <span className="mx-2">/</span>
              </>
            ) : (
              <span className="text-base-dark">{item.label}</span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
