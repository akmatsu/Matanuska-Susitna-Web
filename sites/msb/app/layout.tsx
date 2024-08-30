import type { Metadata } from 'next';

import '@trussworks/react-uswds/lib/index.css';
import '../styles/index.scss';
import { OfficialGovSiteNotice } from '@/components/OfficialGovSiteNotice';
import { TopNavigation } from '@/components/TopNavigation';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
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
        <main>{children}</main>
      </body>
    </html>
  );
}
