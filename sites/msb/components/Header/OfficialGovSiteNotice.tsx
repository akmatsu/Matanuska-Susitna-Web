'use client';
import { appConfig } from '@/configs/config';

import { useState } from 'react';

export function OfficialGovSiteNotice() {
  const [isOpen, setIsOpen] = useState(false);
  const officialNoticeText = `An official website of the ${appConfig.orgName}`;

  const dotGovIcon =
    "data:image/svg+xml,<?xml version='1.0' encoding='UTF-8'?><svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'><title>icon-dot-gov</title><path fill='%232378C3' fill-rule='evenodd' d='m32 0c17.7 0 32 14.3 32 32s-14.3 32-32 32-32-14.3-32-32 14.3-32 32-32zm0 1.2c-17 0-30.8 13.8-30.8 30.8s13.8 30.8 30.8 30.8 30.8-13.8 30.8-30.8-13.8-30.8-30.8-30.8zm11.4 38.9c.5 0 .9.4.9.8v1.6h-24.6v-1.6c0-.5.4-.8.9-.8zm-17.1-12.3v9.8h1.6v-9.8h3.3v9.8h1.6v-9.8h3.3v9.8h1.6v-9.8h3.3v9.8h.8c.5 0 .9.4.9.8v.8h-21.4v-.8c0-.5.4-.8.9-.8h.8v-9.8zm5.7-8.2 12.3 4.9v1.6h-1.6c0 .5-.4.8-.9.8h-19.6c-.5 0-.9-.4-.9-.8h-1.6v-1.6s12.3-4.9 12.3-4.9z'/></svg>";

  const httpsIcon =
    "data:image/svg+xml,<?xml version='1.0' encoding='UTF-8'?><svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'><title>icon-https</title><path fill='%23719F2A' fill-rule='evenodd' d='M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0zm0 1.208C14.994 1.208 1.208 14.994 1.208 32S14.994 62.792 32 62.792 62.792 49.006 62.792 32 49.006 1.208 32 1.208zm0 18.886a7.245 7.245 0 0 1 7.245 7.245v3.103h.52c.86 0 1.557.698 1.557 1.558v9.322c0 .86-.697 1.558-1.557 1.558h-15.53c-.86 0-1.557-.697-1.557-1.558V32c0-.86.697-1.558 1.557-1.558h.52V27.34A7.245 7.245 0 0 1 32 20.094zm0 3.103a4.142 4.142 0 0 0-4.142 4.142v3.103h8.284V27.34A4.142 4.142 0 0 0 32 23.197z'/></svg>";

  const flagImage =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAsBAMAAAAncaPMAAAAAXNSR0IArs4c6QAAABtQTFRF////4EAg2z8g2z8f2z4f2j4fHjSyHjOxHTOxQEYPwgAAAIdJREFUeNrNkUENxDAMBEOhFJaCKZiCKZhCKBj2ebV3rdR71+pIq+Qxj1GyqjJ3U8VlHkc07hFm0awBYe91juq6MSI0yhSAEgkzJ4TMKiXyzFw3pgR9lmIBJlqj2AmBedf+IycExmlKZVzvZEJ4A0oBrjBl/m6PCy95B3fFAN6YuQPxhbcB4QMkEj04wQXD5wAAAABJRU5ErkJggg==';
  // return (
  // <Banner aria-label={officialNoticeText}>
  //   <BannerHeader
  //     isOpen={isOpen}
  //     flagImg={
  //       <BannerFlag
  //         src={flagImage}
  //         aria-hidden
  //         alt="Image of United States Flag"
  //       />
  //     }
  //     headerText={officialNoticeText}
  //     headerActionText="Here's how you know"
  //   >
  //     <BannerButton
  //       isOpen={isOpen}
  //       aria-controls="custom-banner"
  //       onClick={(): void => {
  //         setIsOpen((previousIsOpen) => !previousIsOpen);
  //       }}
  //     >
  //       Here&apos;s how you know
  //     </BannerButton>
  //   </BannerHeader>
  //   <BannerContent id="custom-banner" isOpen={isOpen}>
  //     <div className="grid-row grid-gap-lg">
  //       <BannerGuidance className="tablet:grid-col-6">
  //         <BannerIcon src={dotGovIcon} alt="" />
  //         <MediaBlockBody>
  //           <p>
  //             <strong>Official Borough Websites use matsu.gov</strong>
  //             <br />A <strong>matsu.gov</strong> website belongs to an
  //             official government organization in the {appConfig.orgName}.
  //           </p>
  //         </MediaBlockBody>
  //       </BannerGuidance>
  //       <BannerGuidance className="tablet:grid-col-6">
  //         <BannerIcon src={httpsIcon} alt="" />
  //         <MediaBlockBody>
  //           <p>
  //             <strong>Secure websites use HTTPS</strong>
  //             <br />A{' '}
  //             <strong>
  //               lock (<Icon.Lock aria-label="Locked padlock icon" />)
  //             </strong>{' '}
  //             or <strong>https://</strong> means you&apos;ve safely connected
  //             to the the website. Share sensitive information only on secure
  //             websites.
  //           </p>
  //         </MediaBlockBody>
  //       </BannerGuidance>
  //     </div>
  //   </BannerContent>
  // </Banner>
  // );
}
