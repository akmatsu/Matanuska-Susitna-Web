import type { Metadata } from 'next';

import '@trussworks/react-uswds/lib/index.css';
import '../styles/index.scss';
import { OfficialGovSiteNotice, TopNavigation, MainFooter } from '@/components';
import { Alerts } from '@/components/Alerts';
import { ApolloWrapper } from './ApolloWrapper';
import { Suspense } from 'react';
import { GET_ALERTS_QUERY } from '@/utils/apollo/gqlQueries/getAlerts';
import { PreloadQuery } from '@/utils/apollo/apolloClient';

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
        <ApolloWrapper>
          <OfficialGovSiteNotice />
          <PreloadQuery query={GET_ALERTS_QUERY}>
            <Suspense>
              <Alerts />
            </Suspense>
          </PreloadQuery>

          <TopNavigation />
          <main id="main-content" className="position-relative">
            {children}
          </main>
          <MainFooter />
        </ApolloWrapper>
      </body>
    </html>
  );
}
