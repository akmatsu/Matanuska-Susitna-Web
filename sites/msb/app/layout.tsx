import '@/styles/index.css';
import type { Metadata } from 'next';
import { FeedbackButton } from '@/components/FeedbackButton';
// import { ApolloWrapper } from '@msb/js-sdk/components';
import { Footer } from '@matsugov/ui';
import { Header } from '@matsugov/ui/client';
import Link from 'next/link';
import { primaryNav } from '@/configs/config';
import Image from 'next/image';
import { SiteInfo } from '@/components';

export const metadata: Metadata = {
  title: 'The Matanuska-Susitna Borough',
  description:
    'The official website of the Matanuska-Susitna Borough in Alaska',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* <ApolloWrapper> */}
        <SiteInfo />
        <Header navItems={primaryNav} navLinkAs={Link} imageAs={Image} />
        <main id="main-content" className="position-relative">
          {children}
        </main>
        <FeedbackButton />
        <Footer navLinkAs={Link} navItems={primaryNav} imageAs={Image} />
        {/* </ApolloWrapper> */}
      </body>
    </html>
  );
}
