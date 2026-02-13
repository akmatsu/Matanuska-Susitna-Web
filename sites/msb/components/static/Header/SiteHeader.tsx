import { Header, HeaderNav, NavLink } from '@matsugov/ui/Header';
import { MobileMenu } from '@matsugov/ui/MobileMenu';
import { SiteLogo } from './SiteLogo';
import { primaryNav } from '@/configs/config';
import Link from 'next/link';
import { LinkButton } from '../LinkButton';
import { ComponentProps } from 'react';

export function SiteHeader() {
  return (
    <Header>
      <SiteLogo />
      <HeaderNav>
        <NavItems />
      </HeaderNav>
      <MobileMenu>
        <NavItems />
      </MobileMenu>
    </Header>
  );
}

function NavItems() {
  return (
    <>
      {primaryNav.map(({ label, href }) => (
        <li key={label}>
          <HeaderLink as={Link} href={href}>
            {label}
          </HeaderLink>
        </li>
      ))}
      <li>
        <LinkButton
          href="/search"
          color="primary"
          size="sm"
          icon
          title="Search"
          aria-label="Search"
          blockOnMobile
        >
          <span className="icon-[mdi--magnify] mr-2 size-6 lg:mr-0" />
          <span className="lg:hidden">Search</span>
        </LinkButton>
      </li>
      <li>
        <LinkButton
          href="https://public.govdelivery.com/accounts/AKMATSUGOV/signup/47997"
          color="secondary"
          size="sm"
          className="before:icon-[mdi--email-fast-outline] before:mr-2 before:size-6"
          target="_blank"
          rel="noopener noreferrer"
          title="Get Email Updates"
          aria-label="Get Email Updates"
          blockOnMobile
        >
          Get Email Updates
        </LinkButton>
      </li>
    </>
  );
}

function HeaderLink(props: ComponentProps<typeof NavLink>) {
  return <NavLink as={Link} {...props} />;
}
