'use client';
import { appConfig } from '@/configs/config';
import {
  Header,
  NavMenuButton,
  PrimaryNav,
  Title,
} from '@trussworks/react-uswds';
import Link from 'next/link';
import { useState } from 'react';
import { NavLink, NavLinkProps } from './NavLink';

export function TopNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks: NavLinkProps[] = [
    { href: '#services', children: 'Services' },
    { href: '#communities', children: 'Communities' },
    { href: '#government', children: 'Government' },
    { href: '#departments', children: 'Departments' },
    { href: '#projects', children: 'Projects' },
  ];

  return (
    <Header basic showMobileOverlay={isOpen}>
      <div className="usa-nav-container">
        <div className="usa-navbar">
          <Link href="/" className="text-base-darkest text-no-underline">
            <Title>{appConfig.orgName}</Title>
          </Link>
          <NavMenuButton
            label="Menu"
            onClick={() => setIsOpen((val) => !val)}
          />
        </div>
        <PrimaryNav
          items={navLinks.map((item) => (
            <NavLink {...item} key={item.href} />
          ))}
          mobileExpanded={isOpen}
          onToggleMobileNav={() => setIsOpen((val) => !val)}
        ></PrimaryNav>
      </div>
    </Header>
  );
}
