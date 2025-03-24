'use client';
import Link from 'next/link';
import { Carousel } from '../Carousel';
import React from 'react';
import { Hero as UIHero, Search } from '@matsugov/ui';
import { InstantSearchAutoComplete } from '@/app/search/components/InstantSearchAutoComplete';

export function Hero() {
  const links: { icon: string; text: string; url: string }[] = [
    {
      icon: 'mdi--pets',
      text: 'Animal Care',
      url: 'https://matsugov.us/animalcare',
    },
    {
      icon: 'mdi--message-alert',
      text: 'Problem Reporter',
      url: 'https://problemreporter.matsugov.us/',
    },
    {
      icon: 'mdi--home',
      text: 'myProperty Lookup',
      url: 'https://myproperty.matsugov.us/',
    },
    {
      icon: 'mdi--map',
      text: 'Parcel Viewer',
      url: 'https://mapping.matsugov.us/Html5Viewer/index.html?viewer=MSB_Parcel_Viewer',
    },
  ];

  return (
    <Carousel
      slides={[
        {
          title: 'Home',
          content: (
            <>
              <UIHero
                position="top"
                className="flex justify-center items-center"
              >
                <div className="max-w-[500px] w-full">
                  <InstantSearchAutoComplete />
                </div>
              </UIHero>
              <section className="flex justify-center items-center bg-base-lightest py-4 px-2">
                <div className=" max-w-[900px] w-full">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 w-full">
                    {links.map((link) => (
                      <Link
                        href={link.url}
                        className="rounded px-5 py-3 shadow-lg bg-white hover:bg-gray-100 text-base-darkest font-bold w-full no-underline"
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
          ),
        },
      ]}
    />
  );
}
