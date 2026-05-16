import Link from 'next/link';
import React from 'react';
import { Hero as UIHero } from '@matsugov/ui/Hero';
import { InstantSearchAutoComplete } from '@/components/client/search/InstantSearchAutoComplete';

export function Hero({ image }: { image?: string | null }) {
  const links: { icon: string; text: string; url: string }[] = [
    {
      icon: 'icon-[mdi--pets]',
      text: 'Animal Care',
      url: 'https://matsugov.us/animalcare',
    },
    {
      icon: 'icon-[mdi--message-alert]',
      text: 'Problem Reporter',
      url: 'https://problemreporter.matsugov.us/',
    },
    {
      icon: 'icon-[mdi--home]',
      text: 'myProperty Lookup',
      url: 'https://myproperty.matsugov.us/',
    },
    {
      icon: 'icon-[mdi--map]',
      text: 'Parcel Viewer',
      url: 'https://mapping.matsugov.us/Html5Viewer/index.html?viewer=MSB_Parcel_Viewer',
    },
  ];

  return (
    <>
      <UIHero className="flex items-center justify-center" image={image}>
        <div className="w-full max-w-[500px]">
          <InstantSearchAutoComplete />
        </div>
      </UIHero>
      <section className="bg-msb-base-lightest flex items-center justify-center px-2 py-4">
        <div className="w-full max-w-[900px]">
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {links.map((link) => (
              <Link
                href={link.url}
                className="text-msb-base-darkest w-full rounded-sm bg-white px-5 py-3 font-bold no-underline shadow-lg hover:bg-gray-100"
                key={link.text}
              >
                <div className="flex flex-col items-center">
                  <span
                    className={`iconify size-9 ${link.icon} text-green-600`}
                  ></span>
                  <span>{link.text}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
