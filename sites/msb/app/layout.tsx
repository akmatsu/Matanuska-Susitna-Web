import '@/styles/index.css';
import type { Metadata } from 'next';
import { FeedbackButton } from '@/components/client/FeedbackButton';
import { ApolloWrapper } from '@msb/js-sdk/components';
import { Footer } from '@matsugov/ui/Footer';
import { Header } from '@matsugov/ui/Header';
import Link from 'next/link';
import { primaryNav } from '@/configs/config';
import Image from 'next/image';
import { SiteInfo } from '@/components/static/Header/SiteInfo';
import Script from 'next/script';
import { signIn } from '@/auth';

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
        <ApolloWrapper apiUrl={process.env.NEXT_PUBLIC_API_URL ?? ''}>
          <SiteInfo />
          <Header navItems={primaryNav} navLinkAs={Link} imageAs={Image} />
          <main id="main-content" className="position-relative">
            {children}
          </main>
          <FeedbackButton />
          <Footer
            navLinkAs={Link}
            navItems={primaryNav}
            imageAs={Image}
            signIn={async () => {
              'use server';
              await signIn();
            }}
          />
        </ApolloWrapper>
      </body>
      <Script
        src="//script.crazyegg.com/pages/scripts/0127/8089.js"
        async
        type="text/javascript"
      />
    </html>
  );
}
