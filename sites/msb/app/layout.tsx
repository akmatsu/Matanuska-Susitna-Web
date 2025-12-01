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
import { signIn, signOut, auth } from '@/auth';
import { CookieBannerProvider } from '@matsugov/ui/CookieBannerContext';
import { AnalyticsScript } from '@/components/client/AnalyticsScript';

export const metadata: Metadata =
  process.env.DEPLOY_ENV === 'production'
    ? {
        metadataBase: new URL('https://matsu.gov'),
        title: 'The Matanuska-Susitna Borough',
        description:
          'The official website of the Matanuska-Susitna Borough in Alaska',
      }
    : {
        robots: 'noindex,nofollow',
        title: 'MSB (Development)',
        description:
          'Development environment for the Matanuska-Susitna Borough website, not for public use.',
      };

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const a = await auth();

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
