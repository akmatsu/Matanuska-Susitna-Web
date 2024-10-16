'use client';
import Link from 'next/link';
import { Carousel } from '../Carousel';
import { Grid, Icon, Search } from '@trussworks/react-uswds';
import React from 'react';
import { CoreIcon } from '../CoreIcon';

export function Hero() {
  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  const links: { icon: keyof typeof Icon; text: string; url: string }[] = [
    {
      icon: 'Pets',
      text: 'Animal Care',
      url: 'https://matsugov.us/animalcare',
    },
    {
      icon: 'Announcement',
      text: 'Problem Reporter',
      url: 'https://problemreporter.matsugov.us/',
    },
    {
      icon: 'Home',
      text: 'myProperty Lookup',
      url: 'https://myproperty.matsugov.us/',
    },
    {
      icon: 'Map',
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
              <section
                className="usa-hero display-flex flex-column flex-justify-center flex-align-center text-black text-center"
                aria-label="introduction"
                style={{ minHeight: '300px' }}
              >
                <Search
                  onSubmit={handleSearch}
                  size="big"
                  placeholder="Search website..."
                  style={{ width: '500px' }}
                />
              </section>
              <section className="display-flex padding-y-3 flex-justify-center usa-section--light">
                <div
                  className="grid-container width-full"
                  style={{ maxWidth: '900px' }}
                >
                  <Grid row gap>
                    {links.map((link) => (
                      <Grid
                        col={6}
                        tablet={{ col: 3 }}
                        key={crypto.randomUUID()}
                      >
                        <Link
                          href="https://matsugov.us/animalcare"
                          className="usa-button shadow-2 width-full bg-white hover:bg-base-lightest text-base-darkest"
                        >
                          <div className="display-flex flex-column flex-align-center">
                            <CoreIcon
                              icon={link.icon}
                              size={4}
                              className="margin-bottom-1"
                              color="green"
                            />
                            {link.text}
                          </div>
                        </Link>
                      </Grid>
                    ))}
                  </Grid>
                </div>
              </section>
            </>
          ),
        },
      ]}
    />
  );
}
