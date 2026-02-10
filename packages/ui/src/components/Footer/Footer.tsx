'use client';
import React, { ComponentProps, ReactNode } from 'react';
import { appConfig } from '@matsugov/app-config';
import clsx from 'clsx';
import { PhoneLink } from '../PhoneLink';
import { useCookieBanner } from '../CookieBannerContext';

export function Footer({
  navLinkAs = 'a',
  imageAs = 'img',
  orgName = appConfig.orgName,
  orgLogo = appConfig.orgLogoUrl,
  orgLogoAlt = appConfig.orgLogoAlt,
  homeHref = '/',
  socialLinks = appConfig.orgSocialLinks,
  orgPhone = appConfig.orgPhone,
  contactHref = '#contact',
  navItems,
  logout,
  login,
  signIn,
  signOut,
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
  const Link = navLinkAs;
  const Image = imageAs;
  const { showCookieBanner } = useCookieBanner();

  return (
    <footer>
      <div className="px-4 py-5">
        <Link href="#">Return to top</Link>
      </div>

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
                <SocialIcon label={link.label} href={link.href} />
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="px-4 py-5 bg-primary text-white flex flex-col justify-center items-center text-sm">
        <p className="text-center">
          Main Borough Building:{' '}
          <FooterLink
            href="https://www.google.com/maps/place/350+E+Dahlia+Ave,+Palmer,+AK+99645/@61.5997225,-149.110778,17z/data=!3m1!4b1!4m6!3m5!1s0x56c91defcd78fbef:0x10f2f90bd0714dc4!8m2!3d61.59972!4d-149.1082031!16s%2Fg%2F11snnmm1yd?entry=ttu&g_ep=EgoyMDI1MTAwMS4wIKXMDSoASAFQAw%3D%3D"
            as={Link}
          >
            350 E. Dahlia Ave, Palmer, AK 99645
          </FooterLink>
        </p>
        <p className="text-center">
          <PhoneLink
            phoneNumber={orgPhone}
            className="text-secondary hover:text-secondary-dark"
            as={Link}
          />{' '}
          | Hours: Mon.-Fri. 8 AM - 5 PM
        </p>
        <p className="text-center mt-4">
          &copy; {new Date().getFullYear()} Matanuska-Susitna Borough
        </p>
      </div>
    </footer>
  );
}

function FooterSection({
  linkAs = 'a',

  ...props
}: {
  title: string;
  items: {
    href?: string;
    label: string;
    action?: () => void;
    condition?: boolean;
  }[];
  linkAs?: React.ElementType;
  condition?: boolean;
}) {
  return (
    <section className="text-sm text-center md:text-left">
      <h4 className="font-semibold text-lg">{props.title}</h4>
      <ul className="flex flex-col items-center gap-2 md:items-start">
        {props.items.map((item) =>
          item.condition === undefined || item.condition ? (
            <li key={item.label}>
              {item.href ? (
                <FooterLink href={item.href} as={linkAs}>
                  {item.label}
                </FooterLink>
              ) : (
                <FooterButton onClick={item.action}>{item.label}</FooterButton>
              )}
            </li>
          ) : null,
        )}
      </ul>
    </section>
  );
}

function SocialIcon({
  as = 'a',
  ...props
}: {
  label: string;
  href: string;
  as?: React.ElementType;
}) {
  return (
    <FooterLink
      href={props.href}
      target="_blank"
      className="bg-primary size-14 aspect-square rounded-full flex items-center justify-center hover:bg-primary-dark transition-colors"
      as={as}
    >
      <span
        className={clsx('iconify size-8  text-white', {
          'icon-[mdi--facebook]': props.label === 'Facebook',
          'icon-[mdi--twitter]': props.label === 'Twitter',
          'icon-[mdi--youtube]': props.label === 'YouTube',
          'icon-[mdi--instagram]': props.label === 'Instagram',
          'icon-[mdi--rss]': props.label === 'RSS',
        })}
      ></span>
    </FooterLink>
  );
}

function FooterLink<T extends React.ElementType = React.ElementType>({
  as = 'a',
  className,
  ...props
}: {
  as?: T;
  href: string;
  children: React.ReactNode;
} & ComponentProps<T>) {
  const Link = as;
  return (
    <Link
      className={clsx(
        'text-secondary hover:text-secondary-dark transition-colors',
        className,
      )}
      {...props}
    >
      {props.children}
    </Link>
  );
}

function FooterButton<T extends React.ElementType = 'button'>({
  as = 'button',
  className,
  ...props
}: {
  as?: T;
  children: ReactNode;
} & ComponentProps<T>) {
  const Button = as;
  return (
    <Button
      className={clsx(
        'text-secondary underline cursor-pointer hover:text-secondary-dark transition-colors text-left w-fit',
        className,
      )}
      {...props}
    >
      {props.children}
    </Button>
  );
}
