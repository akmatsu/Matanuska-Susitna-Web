import { appConfig, primaryNav, socialLinks } from '@/configs/config';
import {
  Address,
  Footer,
  FooterNav,
  Grid,
  GridContainer,
  Logo,
  SocialLink,
  SocialLinks,
} from '@trussworks/react-uswds';
import Link from 'next/link';

export function MainFooter() {
  return (
    <Footer
      returnToTop={
        <GridContainer className="usa-footer__return-to-top">
          <a href="#">Return to top</a>
        </GridContainer>
      }
      primary={
        <FooterNav
          aria-label="Footer navigation"
          size="medium"
          links={primaryNav.map((item) => (
            <Link
              href={item.href}
              className="usa-footer__primary-link"
              key={item.href}
            >
              {item.text}
            </Link>
          ))}
        />
      }
      secondary={
        <Grid row gap>
          <Logo
            size="medium"
            image={
              <img
                className="usa-footer__logo-img"
                src={appConfig.orgLogoUrl}
                alt={appConfig.orgLogoAlt}
              />
            }
            heading={
              <p className="usa-footer__logo-heading">{appConfig.orgName}</p>
            }
          />
          <Grid
            className="usa-footer__contact-links"
            mobileLg={{
              col: 6,
            }}
          >
            <SocialLinks
              links={socialLinks.map((link) => (
                <SocialLink key={link.name} href={link.href} name={link.name} />
              ))}
            />

            <Address
              size="medium"
              items={[
                <a key="telephone" href={`tel:${appConfig.orgPhone}`}>
                  {appConfig.orgPhone}
                </a>,
                <Link key="contact" href="#contact">
                  Contact us
                </Link>,
              ]}
            />
          </Grid>
        </Grid>
      }
    />
  );
}
