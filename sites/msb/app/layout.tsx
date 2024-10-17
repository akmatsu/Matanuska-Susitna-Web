import '@trussworks/react-uswds/lib/index.css';
import '../styles/index.scss';
import type { Metadata } from 'next';
import { TopNavigation, MainFooter } from '@/components';
import { SiteInfo } from '@/components/Header/SiteInfo';
import { ApolloWrapper } from './ApolloWrapper';

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
          <SiteInfo />
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
