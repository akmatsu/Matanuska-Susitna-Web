import {
  Footer,
  FooterBody,
  FooterSection,
  FooterSocialIcon,
} from '@matsugov/ui';
import { FooterLogo } from './FooterLogo';
import { Link } from '../Link';
import { primaryNav } from '@/configs/config';
import { SiteFooterLink } from './SiteFooterLink';
import { FooterCookieButton } from './FooterCookieButton';
import { FooterAuthButtonController } from './FooterAuthButtonController';
import { appConfig } from '@matsugov/app-config';
import { PhoneLink } from '../PhoneLink';

export function SiteFooter() {
  return (
    <Footer>
      <div className="px-4 py-5">
        <Link href="#">Return to top</Link>
      </div>
      <FooterBody>
        <FooterLogo />
        <FooterSection title="Explore">
          {primaryNav.map(({ href, label }) => (
            <li key={label}>
              <SiteFooterLink href={href}>{label}</SiteFooterLink>
            </li>
          ))}
        </FooterSection>
        <FooterSection title="Engage">
          <SiteFooterLink href="/departments">Contact Us</SiteFooterLink>
          <FooterCookieButton />
          <SiteFooterLink href="https://public.govdelivery.com/accounts/AKMATSUGOV/subscriber/new">
            Email & SMS Updates
          </SiteFooterLink>
          <SiteFooterLink href="https://www.governmentjobs.com/careers/matsugov">
            Job Opportunities
          </SiteFooterLink>
          <SiteFooterLink href="https://www.governmentjobs.com/careers/matsugov/transferjobs">
            Volunteer Opportunities
          </SiteFooterLink>
          <SiteFooterLink href="https://matsu.gov/boards">
            Serve on a Borough Board
          </SiteFooterLink>
        </FooterSection>
        <FooterSection title="Employees">
          <SiteFooterLink href="https://benefits.matsugov.us/">
            Benefits
          </SiteFooterLink>
          <SiteFooterLink href="https://matsugov.us/join-us/employeeservices">
            Employee Mail & Services
          </SiteFooterLink>
          <SiteFooterLink href="https://matsugovus.sharepoint.com/sites/EmergencyServices">
            First Responder Links
          </SiteFooterLink>
          <SiteFooterLink href="https://matsugovus.sharepoint.com/">
            Intranet
          </SiteFooterLink>
          <FooterAuthButtonController />
        </FooterSection>
        <FooterSection title="Follow Us">
          {appConfig.orgSocialLinks.map(({ label, href }) => (
            <li key={label}>
              <FooterSocialIcon label={label} href={href} />
            </li>
          ))}
        </FooterSection>
      </FooterBody>
      <div className="bg-surface-primary flex flex-col items-center justify-center px-4 py-5 text-sm text-white">
        <p className="text-center">
          Main Borough Building:{' '}
          <SiteFooterLink href="https://www.google.com/maps/place/350+E+Dahlia+Ave,+Palmer,+AK+99645/@61.5997225,-149.110778,17z/data=!3m1!4b1!4m6!3m5!1s0x56c91defcd78fbef:0x10f2f90bd0714dc4!8m2!3d61.59972!4d-149.1082031!16s%2Fg%2F11snnmm1yd?entry=ttu&g_ep=EgoyMDI1MTAwMS4wIKXMDSoASAFQAw%3D%3D">
            350 E. Dahlia Ave, Palmer, AK 99645
          </SiteFooterLink>
        </p>
        <p className="text-center">
          <PhoneLink
            phoneNumber={appConfig.orgPhone}
            className="text-secondary hover:text-secondary-dark"
          />{' '}
          | Hours: Mon.-Fri. 8 AM - 5 PM
        </p>
        <p className="mt-4 text-center">
          &copy; {new Date().getFullYear()} Matanuska-Susitna Borough
        </p>
      </div>
    </Footer>
  );
}
