'use client';
import { appConfig } from '@matsugov/app-config';
import { useState } from 'react';

type HeaderProps = {
  /** The name of the organization */
  orgName?: string;

  /** URL of the org logo */
  orgLogo?: string;

  /** The alt text for the org logo */
  orgLogoAlt?: string;

  /** The href for the home link */
  homeHref?: string;

  /** The component to use for the nav links */
  navLinkAs?: React.ElementType;

  /** The component to use for the image */
  imageAs?: React.ElementType;

  /** The href for the search link */
  searchHref?: string;

  /** Whether to show a search input */
  search?: boolean;

  /** The items to display in the nav */
  navItems?: {
    label: string;
    href: string;
  }[];
};

export function Header({
  orgName = appConfig.orgName,
  orgLogo = appConfig.orgLogoUrl,
  orgLogoAlt = appConfig.orgLogoAlt,
  homeHref = '/',
  navLinkAs = 'a',
  imageAs = 'img',
  navItems = [],
  searchHref = '/search',
  search = true,
}: HeaderProps) {
  const NavLink = navLinkAs;
  const Image = imageAs;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white min-h-12 lg:min-h-20 flex items-center justify-between pl-4 lg:pr-4 shadow-md">
      <div className="flex items-center justify-between w-full min-h-full">
        <NavLink href={homeHref} className="no-underline text-base-darkest">
          <div className="flex items-center gap-2">
            <Image
              src={orgLogo}
              alt={orgLogoAlt}
              className="size-10 lg:size-14"
              width={56}
              height={56}
            />
            <span className="text-sm lg:text-2xl font-bold">{orgName}</span>
          </div>
        </NavLink>

        <div className="lg:hidden">
          <button
            onClick={() => setIsOpen(true)}
            className="px-2 leading-none text-sm shadow-2xs text-center bg-primary hover:bg-primary-dark active:bg-primary-darker text-white h-12 flex items-center justify-center focus-ring"
            aria-label="Open menu"
          >
            MENU
          </button>
        </div>

        <nav className="hidden lg:flex items-center gap-4">
          <ul className="flex items-center gap-4">
            {navItems.map(({ label, href }) => (
              <li key={href}>
                <NavLink
                  className="py-4 text-sm font-bold text-base-darker hover:border-b-4 hover:border-primary hover:text-primary transition-colors no-underline"
                  href={href}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
          {search && (
            <NavLink
              href={searchHref}
              className="rounded-xs leading-none font-bold focus-ring shadow-2xs text-center bg-primary hover:bg-primary-dark active:bg-primary-darker text-white size-8 flex items-center justify-center"
            >
              <span className="icon-[mdi--magnify] size-6"></span>
            </NavLink>
          )}
        </nav>

        {/* Mobile Nav Drawer */}
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity lg:hidden z-50 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
          <div
            className={`fixed inset-y-0 right-0 w-64 bg-white shadow-lg transform transition-transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
          >
            <div className="p-4">
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
                className="rounded-xs bg-primary hover:bg-primary-dark active:bg-primary-darker text-white size-8 flex items-center justify-center focus-ring"
              >
                <span className="icon-[mdi--close] size-4"></span>
              </button>

              <ul className="flex flex-col gap-4">
                {navItems.map(({ label, href }) => (
                  <li key={href}>
                    <NavLink
                      className="block py-2 text-sm font-bold text-base-darker focus-ring hover:text-primary"
                      href={href}
                      onClick={() => setIsOpen(false)}
                    >
                      {label}
                    </NavLink>
                  </li>
                ))}
              </ul>

              {search && (
                <NavLink
                  href={searchHref}
                  className="mt-4 w-full rounded-xs leading-none font-bold focus-ring shadow-2xs text-center bg-primary hover:bg-primary-dark active:bg-primary-darker text-white p-2 flex items-center justify-center"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="icon-[mdi--magnify] size-6 mr-2"></span>
                  Search
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
