'use client';
import React from 'react';
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
  logout,
  login,
  signIn,
  signOut,
}: {
  navLinkAs?: React.ElementType;
  imageAs?: React.ElementType;
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

      <div className="flex flex-col lg:flex-row gap-8 px-4 py-2 bg-base-lightest items-center">
        <Link href={homeHref} className="flex items-center gap-2 no-underline">
          <div className="flex flex-col md:flex-row items-center gap-2">
            <div className="size-20 md:size-15 relative aspect-square">
              <Image src={orgLogo} alt={orgLogoAlt} fill />
            </div>
            <span className="sm:text-2xl font-bold text-base-darkest">
              {orgName}
            </span>
          </div>
        </Link>
        <div className="flex flex-col lg:flex-row lg:ml-auto items-center gap-y-2 gap-x-4 flex-wrap">
          <Link href={contactHref}>Contact Us</Link>
          {login && (
            <>
              <button
                className="text-primary underline cursor-pointer"
                onClick={signIn}
              >
                Login
              </button>{' '}
            </>
          )}
          {logout && (
            <>
              <button
                className="text-primary underline cursor-pointer"
                onClick={signOut}
              >
                Logout
              </button>{' '}
            </>
          )}
          <button
            className="text-primary underline cursor-pointer"
            onClick={showCookieBanner}
          >
            Change Cookie Settings
          </button>{' '}
          <Link
            href="https://matsugov.us/join-us/employeeservices"
            target="_blank"
            rel="noopener noreferrer"
          >
            Employee Mail & Services
          </Link>
        </div>
        <ul className="flex gap-2 items-center">
          {socialLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                target="_blank"
                className="bg-gray-20 size-12 flex items-center justify-center"
              >
                <span
                  className={clsx('iconify size-10 text-base-darkest', {
                    'icon-[mdi--facebook]': link.label === 'Facebook',
                    'icon-[mdi--twitter]': link.label === 'Twitter',
                    'icon-[mdi--youtube]': link.label === 'YouTube',
                    'icon-[mdi--instagram]': link.label === 'Instagram',
                    'icon-[mdi--rss]': link.label === 'RSS',
                  })}
                ></span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="px-4 py-5 bg-base-lighter flex flex-col justify-center items-center">
        <p className="text-center">
          Main Borough Building:{' '}
          <Link href="https://www.google.com/maps/place/350+E+Dahlia+Ave,+Palmer,+AK+99645/@61.5997225,-149.110778,17z/data=!3m1!4b1!4m6!3m5!1s0x56c91defcd78fbef:0x10f2f90bd0714dc4!8m2!3d61.59972!4d-149.1082031!16s%2Fg%2F11snnmm1yd?entry=ttu&g_ep=EgoyMDI1MTAwMS4wIKXMDSoASAFQAw%3D%3D">
            350 E. Dahlia Ave, Palmer, AK 99645
          </Link>
        </p>
        <p className="text-center">
          <PhoneLink phoneNumber={orgPhone} /> | Hours: Mon.-Fri. 8 AM - 5 PM
        </p>
      </div>
    </footer>
  );
}
