import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';
import { appConfig } from '@matsugov/app-config';

type BannerProps = {
  label?: string;
  orgName?: string;
};

export function Banner({
  orgName = appConfig.orgName,
  label = `An official website of the ${orgName}.`,
}: BannerProps) {
  const dotGovIcon =
    "data:image/svg+xml,<?xml version='1.0' encoding='UTF-8'?><svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'><title>icon-dot-gov</title><path fill='%232378C3' fill-rule='evenodd' d='m32 0c17.7 0 32 14.3 32 32s-14.3 32-32 32-32-14.3-32-32 14.3-32 32-32zm0 1.2c-17 0-30.8 13.8-30.8 30.8s13.8 30.8 30.8 30.8 30.8-13.8 30.8-30.8-13.8-30.8-30.8-30.8zm11.4 38.9c.5 0 .9.4.9.8v1.6h-24.6v-1.6c0-.5.4-.8.9-.8zm-17.1-12.3v9.8h1.6v-9.8h3.3v9.8h1.6v-9.8h3.3v9.8h1.6v-9.8h3.3v9.8h.8c.5 0 .9.4.9.8v.8h-21.4v-.8c0-.5.4-.8.9-.8h.8v-9.8zm5.7-8.2 12.3 4.9v1.6h-1.6c0 .5-.4.8-.9.8h-19.6c-.5 0-.9-.4-.9-.8h-1.6v-1.6s12.3-4.9 12.3-4.9z'/></svg>";

  const httpsIcon =
    "data:image/svg+xml,<?xml version='1.0' encoding='UTF-8'?><svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'><title>icon-https</title><path fill='%23719F2A' fill-rule='evenodd' d='M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0zm0 1.208C14.994 1.208 1.208 14.994 1.208 32S14.994 62.792 32 62.792 62.792 49.006 62.792 32 49.006 1.208 32 1.208zm0 18.886a7.245 7.245 0 0 1 7.245 7.245v3.103h.52c.86 0 1.557.698 1.557 1.558v9.322c0 .86-.697 1.558-1.557 1.558h-15.53c-.86 0-1.557-.697-1.557-1.558V32c0-.86.697-1.558 1.557-1.558h.52V27.34A7.245 7.245 0 0 1 32 20.094zm0 3.103a4.142 4.142 0 0 0-4.142 4.142v3.103h8.284V27.34A4.142 4.142 0 0 0 32 23.197z'/></svg>";

  return (
    <Disclosure
      as={'section'}
      aria-label={label}
      className="bg-surface-primary px-4 text-white"
    >
      <div className="mx-auto">
        <DisclosureButton className="group flex cursor-pointer items-center py-1 text-left text-xs leading-none">
          <img
            src="/msb_icon_yellow.svg"
            alt="MSB Logo"
            className="mr-2 inline-block size-8"
          />
          <span>
            {label}{' '}
            <span className="text-secondary underline">
              Here&apos;s how you know
            </span>
            <span className="icon-[mdi--chevron-down] text-secondary size-4 align-bottom transition-transform group-data-open:rotate-180"></span>
          </span>
        </DisclosureButton>

        <DisclosurePanel className="py-6">
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <div className="flex w-full">
              <div className="flex gap-2">
                <img src={dotGovIcon} alt="Dot Gov Icon" className="size-10" />
                <div>
                  <p>
                    <strong>Official MSB websites use matsu.gov</strong>
                    <br />
                    <span>
                      A <strong>matsu.gov</strong> website belongs to an
                      official government site in the {orgName}.
                    </span>
                  </p>
                </div>
              </div>
              <div></div>
            </div>
            <div className="flex w-full">
              <div className="flex gap-2">
                <img src={httpsIcon} alt="Dot Gov Icon" className="size-10" />
                <div>
                  <p>
                    <strong>Secure .gov websites use HTTPS</strong>
                    <br />
                    <span>
                      A <strong>lock</strong> ({' '}
                      <span className="icon-[mdi--lock] size-4"></span> ) or{' '}
                      <strong>https://</strong> means you&apos;ve securely
                      connected to the website. Only share sensitive information
                      on websites.
                    </span>
                  </p>
                </div>
              </div>
              <div></div>
            </div>
          </div>
        </DisclosurePanel>
      </div>
    </Disclosure>
  );
}
