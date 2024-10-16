'use client';
import Link from 'next/link';
import { appConfig, primaryNav } from '@/configs/config';
import {
  Button,
  Header,
  Icon,
  NavMenuButton,
  PrimaryNav,
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
    <Header showMobileOverlay={isOpen} basic className="bg-white shadow-1">
      <div className="usa-nav-container ">
        <div className="usa-navbar">
          <Title className="margin-top-2">
            <Link href="/">
              <div className="display-flex flex-align-center">
                <img
                  src={appConfig.orgLogoUrl}
                  className="circle-6 mobile-lg:circle-4 margin-right-1"
                ></img>
                <span>{appConfig.orgName}</span>
              </div>
            </Link>
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
          <Button type="button" className="padding-05">
            <Icon.Search size={3} />
          </Button>
        </PrimaryNav>
      </div>
    </Header>
  );
}
