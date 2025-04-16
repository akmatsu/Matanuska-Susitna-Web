import '@/styles/index.css';
import type { Metadata } from 'next';
import { ApolloWrapper } from '@msb/js-sdk/components';
import { SiteInfo } from '@/components/Header/SiteInfo';
import { FeedbackButton } from '@/components/FeedbackButton';
import { Header, Footer } from '@matsugov/ui';
import Link from 'next/link';
import { primaryNav } from '@/configs/config';
import Image from 'next/image';

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
        <ApolloWrapper apiUrl={process.env.NEXT_PUBLIC_API_URL || ''}>
          <SiteInfo />

          <Header navItems={primaryNav} navLinkAs={Link} imageAs={Image} />
          <main id="main-content" className="position-relative">
            {children}
          </main>
          <FeedbackButton />
          <Footer navLinkAs={Link} navItems={primaryNav} imageAs={Image} />
        </ApolloWrapper>
      </body>
    </html>
  );
}
