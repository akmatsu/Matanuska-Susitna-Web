// import { appConfig } from '@matsugov/app-config';
// import { PhoneLink } from '../PhoneLink';
// import { useCookieBanner } from '../CookieBannerContext';
// import { FooterSection } from './FooterSection';
// import { FooterSocialIcon } from './FooterSocialIcon';
// import { FooterBody } from './FooterBody';
// import { FooterLink } from './FooterLink';

export function Footer({
  // navLinkAs = 'a',
  // imageAs = 'img',
  // orgName = appConfig.orgName,
  // orgLogo = appConfig.orgLogoUrl,
  // orgLogoAlt = appConfig.orgLogoAlt,
  // homeHref = '/',
  children,
  // socialLinks = appConfig.orgSocialLinks,
  // orgPhone = appConfig.orgPhone,
  // contactHref = '#contact',
  // navItems,
  // logout,
  // login,
  // signIn,
  // signOut,
}: {
  // navLinkAs?: React.ElementType;
  // imageAs?: React.ElementType;
  // navItems?: { href: string; label: string }[];
  // orgName?: string;
  // orgLogo?: string;
  // orgLogoAlt?: string;
  // homeHref?: string;
  children?: React.ReactNode;
  // socialLinks?: { label: string; href: string }[];
  // orgPhone?: string;
  // contactHref?: string;
  // login?: boolean;
  // logout?: boolean;
  // signIn?: () => void;
  // signOut?: () => void;
}) {
  // const Link = navLinkAs;
  // const Image = imageAs;
  // const { showCookieBanner } = useCookieBanner();

  return (
    <footer>
      {children}

      {/* <section className="text-center md:text-left">
          <h4 className="text-lg font-semibold">Follow Us</h4>
          <ul className="flex items-center justify-center gap-2">
      <div className="flex flex-col md:justify-center md:flex-row gap-8 xl:gap-16 p-4 bg-surface-primary text-white">
        <Link href={homeHref} className="no-underline">
          <div className="flex flex-col md:flex-row items-center gap-2">
            <div className="size-20 md:size-15 relative aspect-square">
              <Image src={orgLogo} alt={orgLogoAlt} fill />
            </div>
            <span className="sm:text-2xl font-bold text-white">{orgName}</span>
          </div>
        </Link>

        <FooterSection
          title="Explore"
          items={[
            ...(navItems ? navItems : []),
            {
              label: 'Accessibility Statement',
              href: '/policies/accessibility-statement',
            },
          ]}
          linkAs={Link}
        />

        <FooterSection
          linkAs={Link}
          title="Engage"
          items={[
            {
              label: 'Contact Us',
              href: contactHref,
            },
            {
              label: 'Change Cookie Settings',
              action: () => showCookieBanner(),
            },
            {
              label: 'Email & SMS Updates',
              href: 'https://public.govdelivery.com/accounts/AKMATSUGOV/subscriber/new',
            },
            {
              label: 'Job Opportunities',
              href: 'https://www.governmentjobs.com/careers/matsugov',
            },
            {
              label: 'Volunteer Opportunities',
              href: 'https://www.governmentjobs.com/careers/matsugov/transferjobs',
            },
            {
              label: 'Serve on a Borough Board',
              href: 'https://matsu.gov/boards',
            },
          ]}
        />

        <FooterSection
          linkAs={Link}
          title="Employees"
          items={[
            {
              label: 'Benefits',
              href: 'https://benefits.matsugov.us/',
            },
            {
              label: 'Employee Mail & Services',
              href: 'https://matsugov.us/join-us/employeeservices',
            },
            {
              label: 'First Responder Links',
              href: 'https://matsugovus.sharepoint.com/sites/EmergencyServices',
            },
            {
              label: 'Intranet',
              href: 'https://matsugovus.sharepoint.com/',
            },
            {
              label: 'Login',
              action: signIn,
              condition: login,
            },
            {
              label: 'Logout',
              action: signOut,
              condition: logout,
            },
          ]}
        />
        <section className="text-center md:text-left">
          <h4 className="font-semibold text-lg">Follow Us</h4>
          <ul className="flex gap-2 items-center justify-center">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <FooterSocialIcon label={link.label} href={link.href} />
              </li>
            ))}
          </ul>
        </section>
      </FooterBody> */}
    </footer>
  );
}
