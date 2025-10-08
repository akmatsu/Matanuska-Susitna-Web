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
import { CookieBanner } from '@matsugov/ui/CookieBanner';
import { signIn, signOut, auth } from '@/auth';
import { CookieBannerProvider } from '@matsugov/ui/CookieBannerContext';
import { AnalyticsScript } from '@/components/client/AnalyticsScript';

export const metadata: Metadata = {
  metadataBase:
    process.env.NODE_ENV === 'production'
      ? new URL('https://matsu.gov')
      : undefined,
  title: 'The Matanuska-Susitna Borough',
  description:
    'The official website of the Matanuska-Susitna Borough in Alaska',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const a = await auth();
  console.log(a);

  return (
    <html lang="en">
      <body>
        <ApolloWrapper apiUrl={process.env.NEXT_PUBLIC_API_URL ?? ''}>
          <CookieBannerProvider>
            <SiteInfo />
            <Header navItems={primaryNav} navLinkAs={Link} imageAs={Image} />
            <main id="main-content" className="position-relative">
              {children}
            </main>
            <FeedbackButton />
            <Footer
              navLinkAs={Link}
              imageAs={Image}
              contactHref="/departments"
              navItems={primaryNav}
              login={!a?.user}
              logout={!!a?.user}
              signIn={async () => {
                'use server';
                await signIn();
              }}
              signOut={async () => {
                'use server';
                await signOut();
              }}
            />
            <AnalyticsScript />
          </CookieBannerProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}
