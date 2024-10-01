import type { Metadata } from 'next';

import '@trussworks/react-uswds/lib/index.css';
import '../styles/index.scss';
import { OfficialGovSiteNotice, TopNavigation, MainFooter } from '@/components';
import { Alerts } from '@/components/Alerts';

export const metadata: Metadata = {
  title: 'The Matanuska-Susitna Borough',
  description:
    'The official website of the Matanuska-Susitna Borough in Alaska',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <OfficialGovSiteNotice />
        <Alerts />

        <TopNavigation />
        <main id="main-content" className="position-relative">
          {children}
        </main>
        <MainFooter />
      </body>
    </html>
  );
}
