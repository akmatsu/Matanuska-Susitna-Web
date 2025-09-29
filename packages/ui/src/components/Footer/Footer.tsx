'use client';
import React from 'react';
import { appConfig } from '@matsugov/app-config';
import clsx from 'clsx';
import { PhoneLink } from '../PhoneLink';
import { useCookieBanner } from '../CookieBannerContext';

export function Footer({
  navLinkAs = 'a',
  imageAs = 'img',
  navItems = [],
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
      <nav>
        <ul className="flex gap-8 p-4 bg-base-lightest flex-wrap">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="font-bold underline visited:text-purple-900"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="px-4 py-5 bg-base-lighter flex justify-between items-center gap-4 flex-wrap">
        <Link href={homeHref} className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Image
              src={orgLogo}
              alt={orgLogoAlt}
              className="size-20"
              width={80}
              height={80}
            />
            <span className="sm:text-2xl font-bold no-underline text-base-darkest">
              {orgName}
            </span>
          </div>
        </Link>
        <div className="flex flex-col items-end gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            {socialLinks.map((link) => (
              <Link
                href={link.href}
                key={link.label}
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
            ))}
          </div>
          <div className="flex gap-8 flex-wrap">
            <PhoneLink
              as={Link}
              phoneNumber={orgPhone}
              className="text-base-darkest"
            />

            <Link className="text-base-darkest" href={contactHref}>
              Contact Us
            </Link>

            {login && (
              <button
                className="text-base-darkest underline cursor-pointer"
                onClick={signIn}
              >
                Login
              </button>
            )}
            {logout && (
              <button
                className="text-base-darkest underline cursor-pointer"
                onClick={signOut}
              >
                Logout
              </button>
            )}
            <button
              className="text-base-darkest underline cursor-pointer"
              onClick={showCookieBanner}
            >
              Change Cookie Settings
            </button>
            <Link
              className="text-base-darkest"
              href="https://www.google.com/maps/place/350+E+Dahlia+Ave,+Palmer,+AK+99645/@61.5997207,-149.1088657,18z/data=!3m1!4b1!4m6!3m5!1s0x56c91defcd78fbef:0x10f2f90bd0714dc4!8m2!3d61.59972!4d-149.1082031!16s%2Fg%2F11snnmm1yd?entry=ttu&g_ep=EgoyMDI1MDkyNC4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
            >
              350 E Dahlia Ave, Palmer, AK 99645
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
