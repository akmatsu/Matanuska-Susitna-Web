import { BackButton } from '@/components/backButton';
import { Suspense } from 'react';

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Suspense>
              <BackButton />
            </Suspense>
          </li>
        </ul>
      </nav>
      {props.children}
    </div>
  );
}
