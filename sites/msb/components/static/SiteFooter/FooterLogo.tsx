import { appConfig } from '@matsugov/app-config';
import Image from 'next/image';
import Link from 'next/link';

export function FooterLogo() {
  return (
    <Link href="/" className="no-underline">
      <div className="flex flex-col items-center gap-2 md:flex-row">
        <div className="relative aspect-square size-20 md:size-15">
          <Image src={appConfig.orgLogoUrl} alt={appConfig.orgLogoAlt} fill />
        </div>
        <span className="font-bold text-white sm:text-2xl">
          {appConfig.orgName}
        </span>
      </div>
    </Link>
  );
}
