import React from 'react';
import { appConfig } from '@matsugov/app-config';
import clsx from 'clsx';

export function Footer({
  navLinkAs = 'a',
  navItems = [],
  orgName = appConfig.orgName,
  orgLogo = appConfig.orgLogoUrl,
  orgLogoAlt = appConfig.orgLogoAlt,
  homeHref = '/',
  socialLinks = appConfig.orgSocialLinks,
  orgPhone = appConfig.orgPhone,
  contactHref = '#contact',
}: {
  navLinkAs?: React.ElementType;
  navItems?: { href: string; label: string }[];
  orgName?: string;
  orgLogo?: string;
  orgLogoAlt?: string;
  homeHref?: string;
  socialLinks?: { label: string; href: string }[];
  orgPhone?: string;
  contactHref?: string;
}) {
  const Link = navLinkAs;

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
            <img src={orgLogo} alt={orgLogoAlt} className="size-20" />
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
                className="bg-gray-20 size-12 flex items-center justify-center"
              >
                <span
                  className={clsx('iconify size-10 text-base-darkest', {
                    'mdi--facebook': link.label === 'Facebook',
                    'mdi--twitter': link.label === 'Twitter',
                    'mdi--youtube': link.label === 'YouTube',
                    'mdi--instagram': link.label === 'Instagram',
                    'mdi--rss': link.label === 'RSS',
                  })}
                ></span>
              </Link>
            ))}
          </div>
          <div className="flex gap-8 flex-wrap">
            <Link className="text-base-darkest" href={`tel:${orgPhone}`}>
              {orgPhone}
            </Link>
            <Link className="text-base-darkest" href={contactHref}>
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
