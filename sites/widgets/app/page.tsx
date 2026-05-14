import Link from 'next/link';
import { readdirSync, statSync } from 'fs';
import { join } from 'path';

function formatRouteName(dirName: string): string {
  return dirName
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default function Home() {
  const appDir = join(process.cwd(), 'app');
  const items = readdirSync(appDir);

  // Filter for directories only, excluding layout, page, and other special files
  const routes = items
    .filter((item) => {
      const itemPath = join(appDir, item);
      return statSync(itemPath).isDirectory() && !item.startsWith('.');
    })
    .sort();

  return (
    <div className="prose prose-a:not-prose mx-auto max-w-6xl py-6">
      <h1>Matanuska-Susitna Web Widgets</h1>
      <ul>
        {routes.map((route) => (
          <li key={route}>
            <Link href={`/${route}`} target="_parent">
              {formatRouteName(route)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
