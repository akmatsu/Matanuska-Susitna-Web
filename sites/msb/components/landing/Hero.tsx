import { appConfig } from '@/configs/config';

import { Carousel } from '../Carousel';

export function Hero() {
  return (
    <Carousel
      slides={[
        {
          title: 'Home',
          content: (
            <section
              className="usa-hero display-flex flex-column flex-justify-center flex-align-center text-black text-center"
              aria-label="introduction"
              style={{ minHeight: '350px' }}
            >
              <p style={{ width: 'fit-content' }} className="font-alt-lg">
                Welcome to the
              </p>
              <h1 className="text-black margin-top-0">{appConfig.orgName}</h1>
            </section>
          ),
        },
      ]}
    />
  );
}
