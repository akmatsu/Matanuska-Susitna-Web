import { appConfig } from '@matsugov/app-config';
import Image from 'next/image';
import NextLink from 'next/link';

export function SiteLogo() {
  return (
    <NextLink
      href="/"
      className="text-base-darkest no-underline"
      aria-label="Go to MSB home page"
      title="MSB Home"
    >
      <div className="flex items-center gap-2">
        <div className="relative size-10 lg:size-14">
          <Image src={appConfig.orgLogoUrl} alt={appConfig.orgLogoAlt} fill />
        </div>
        <span className="text-sm font-bold lg:text-2xl">
          {appConfig.orgName}
        </span>
      </div>
    </NextLink>
  );
}
