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

export function TopNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const testItemsMenu = [
    <Link href="#two" key="two" className="usa-nav__link">
      Services
    </Link>,
    <Link href="#three" key="three" className="usa-nav__link">
      Communities
    </Link>,
    <Link href="#three" key="three" className="usa-nav__link">
      Government
    </Link>,
    <Link href="#three" key="three" className="usa-nav__link">
      Departments
    </Link>,
    <Link href="#three" key="three" className="usa-nav__link">
      Property & Maps
    </Link>,
  ];

  return (
    <Header basic showMobileOverlay={isOpen}>
      <div className="usa-nav-container">
        <div className="usa-navbar">
          <Title>{appConfig.orgName}</Title>
          <NavMenuButton
            label="Menu"
            onClick={() => setIsOpen((val) => !val)}
          />
        </div>
        <PrimaryNav
          items={testItemsMenu}
          mobileExpanded={isOpen}
          onToggleMobileNav={() => setIsOpen((val) => !val)}
        ></PrimaryNav>
      </div>
    </Header>
  );
}
