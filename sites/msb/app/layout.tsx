import type { Metadata } from 'next';

import '@trussworks/react-uswds/lib/index.css';
import '../styles/index.scss';
import { OfficialGovSiteNotice } from '@/components/OfficialGovSiteNotice';
import { TopNavigation } from '@/components/TopNavigation';

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
        <TopNavigation />
        <main id="main-content">{children}</main>
      </body>
    </html>
  );
}
