import './global.tw.css';
import type { Metadata } from 'next';
import { FeedbackButton } from '@/components/client/FeedbackButton';
import { ApolloWrapper } from '@msb/js-sdk/components';
import { SiteInfo } from '@/components/static/Header/SiteInfo';
// import { signIn, signOut, auth } from '@/auth';
import { CookieBannerProvider } from '@matsugov/ui/CookieBannerContext';
import { AnalyticsScript } from '@/components/client/AnalyticsScript';
import { SideNavDrawerProvider } from '../hooks/SideNavDrawerContext';
import { SiteHeader } from '@/components/static/Header/SiteHeader';
import { SiteFooter } from '@/components/static/SiteFooter/SiteFooter';

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
  // const a = await auth();

  return (
    <html lang="en" className="scroll-smooth">
      <body>
        <ApolloWrapper apiUrl={process.env.NEXT_PUBLIC_API_URL ?? ''}>
          <SiteInfo />
          <SiteHeader />
          <main id="main-content" className="position-relative">
            <SideNavDrawerProvider>{children}</SideNavDrawerProvider>
          </main>
          <FeedbackButton />
          {/* <Footer
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
                    /> */}
          <CookieBannerProvider>
            <SiteFooter />
            <AnalyticsScript />
          </CookieBannerProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}
