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
