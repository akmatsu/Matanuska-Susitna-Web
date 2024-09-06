import type { Metadata } from 'next';

import '@trussworks/react-uswds/lib/index.css';
import '../styles/index.scss';
import { OfficialGovSiteNotice, TopNavigation, MainFooter } from '@/components';
import { Alert } from '@trussworks/react-uswds';

export const metadata: Metadata = {
  title: 'The Matanuska-Susitna Borough',
  description:
    'The official website of the Matanuska-Susitna Borough in Alaska',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <OfficialGovSiteNotice />
        {process.env.NODE_ENV === 'development' && (
          <Alert
            type="warning"
            slim
            headingLevel="h4"
            className="padding-top-0"
          >
            This site is in development.{' '}
            <a
              href="https://matsugov.us"
              className="usa-link--external"
              referrerPolicy="no-referrer"
            >
              Visit the previous website
            </a>
          </Alert>
        )}
        <TopNavigation />
        <main id="main-content">{children}</main>
        <MainFooter />
      </body>
    </html>
  );
}
