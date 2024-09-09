'use client';
import { appConfig, primaryNav } from '@/configs/config';
import {
  Header,
  Logo,
  NavMenuButton,
  PrimaryNav,
  Search,
  Title,
} from '@trussworks/react-uswds';

import { useState } from 'react';
import { NavLink } from './NavLink';

export function TopNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  function handleSearch() {
    console.log('ran');
  }

  return (
    <Header
      showMobileOverlay={isOpen}
      basic
      className="position-sticky top-0 z-500 bg-white shadow-1"
    >
      <div className="usa-nav-container ">
        <div className="usa-navbar">
          <Title className="margin-top-2">
            <div className="display-flex flex-align-center">
              <img
                src={appConfig.orgLogoUrl}
                className="circle-6 mobile-lg:circle-4 margin-right-1"
              ></img>
              <span>{appConfig.orgName}</span>
            </div>
          </Title>

          <NavMenuButton
            label="Menu"
            onClick={() => setIsOpen((val) => !val)}
          />
        </div>
        <PrimaryNav
          items={primaryNav.map((item) => (
            <NavLink href={item.href} key={item.href}>
              {item.text}
            </NavLink>
          ))}
          mobileExpanded={isOpen}
          onToggleMobileNav={() => setIsOpen((val) => !val)}
        >
          <Search size="small" onSubmit={handleSearch}></Search>
        </PrimaryNav>
      </div>
    </Header>
  );
}
