import { appConfig } from '@matsugov/app-config';
import { PhoneLink } from '../PhoneLink';
// import { useCookieBanner } from '../CookieBannerContext';
// import { FooterSection } from './FooterSection';
import { FooterSocialIcon } from './FooterSocialIcon';
import { FooterLink } from './FooterLink';

export function Footer({
  // navLinkAs = 'a',
  // imageAs = 'img',
  // orgName = appConfig.orgName,
  // orgLogo = appConfig.orgLogoUrl,
  // orgLogoAlt = appConfig.orgLogoAlt,
  // homeHref = '/',
  socialLinks = appConfig.orgSocialLinks,
  // orgPhone = appConfig.orgPhone,
  // contactHref = '#contact',
  // navItems,
  // logout,
  // login,
  // signIn,
  // signOut,
}: {
  navLinkAs?: React.ElementType;
  imageAs?: React.ElementType;
  navItems?: { href: string; label: string }[];
  orgName?: string;
  orgLogo?: string;
  orgLogoAlt?: string;
  homeHref?: string;
  socialLinks?: { label: string; href: string }[];
  orgPhone?: string;
  contactHref?: string;
  login?: boolean;
  logout?: boolean;
  signIn?: () => void;
  signOut?: () => void;
}) {
  // const Link = navLinkAs;
  // const Image = imageAs;
  // const { showCookieBanner } = useCookieBanner();

  return (
    <footer>
      <div className="px-4 py-5">
        {/* <Link href="#">Return to top</Link> */}
      </div>

      <div className="bg-surface-primary flex flex-col gap-8 p-4 text-white md:flex-row md:justify-center xl:gap-16">
        {/* <Link href={homeHref} className="no-underline">
          <div className="flex flex-col items-center gap-2 md:flex-row">
            <div className="relative aspect-square size-20 md:size-15">
              <Image src={orgLogo} alt={orgLogoAlt} fill />
            </div>
            <span className="font-bold text-white sm:text-2xl">{orgName}</span>
          </div>
        </Link> */}

        {/* <FooterSection title="Explore" items={navItems || []} linkAs={Link} />

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
        /> */}
        <section className="text-center md:text-left">
          <h4 className="text-lg font-semibold">Follow Us</h4>
          <ul className="flex items-center justify-center gap-2">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <FooterSocialIcon label={link.label} href={link.href} />
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="bg-surface-primary flex flex-col items-center justify-center px-4 py-5 text-sm text-white">
        <p className="text-center">
          Main Borough Building:{' '}
          {/* <FooterLink
            href="https://www.google.com/maps/place/350+E+Dahlia+Ave,+Palmer,+AK+99645/@61.5997225,-149.110778,17z/data=!3m1!4b1!4m6!3m5!1s0x56c91defcd78fbef:0x10f2f90bd0714dc4!8m2!3d61.59972!4d-149.1082031!16s%2Fg%2F11snnmm1yd?entry=ttu&g_ep=EgoyMDI1MTAwMS4wIKXMDSoASAFQAw%3D%3D"
            as={Link}
          >
            350 E. Dahlia Ave, Palmer, AK 99645
          </FooterLink> */}
        </p>
        <p className="text-center">
          {/* <PhoneLink
            phoneNumber={orgPhone}
            className="text-secondary hover:text-secondary-dark"
            as={Link}
          />{' '} */}
          | Hours: Mon.-Fri. 8 AM - 5 PM
        </p>
        <p className="mt-4 text-center">
          &copy; {new Date().getFullYear()} Matanuska-Susitna Borough
        </p>
      </div>
    </footer>
  );
}
