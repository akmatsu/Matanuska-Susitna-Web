import '@matsugov/ui/styles';
import '../styles/index.css';
import type { Metadata } from 'next';
import { ApolloWrapper } from './ApolloWrapper';
import { SiteInfo } from '@/components/Header/SiteInfo';
import { MainFooter, TopNavigation } from '@/components';
import { FeedbackButton } from '@/components/FeedbackButton';

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
          <FeedbackButton />
          <MainFooter />
        </ApolloWrapper>
      </body>
    </html>
  );
}
