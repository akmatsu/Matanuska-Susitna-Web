import { appConfig } from '@/configs/config';
import Link from 'next/link';

export function HighlightGrid() {
  const highlights: {
    title: string;
    imageUrl: string;
    imageAlt: string;
    text: string;
    linkUrl: string;
  }[][] = [
    [
      {
        title: 'Borough Legislation',
        imageUrl:
          'https://d1159zutbdy4l.cloudfront.net/public/uploads/cecd6a1d-d448-43de-bfa3-0e88db96c989optimized_images/500x185_optimized_image.jpg',
        imageAlt: 'A stack of documents',
        text: `Explore recent legislation passed by the ${appConfig.orgName}. Stay informed and see how local decisions affect you.`,
        linkUrl: '',
      },
      {
        title: 'Borough Taxes',
        imageUrl:
          'https://d1159zutbdy4l.cloudfront.net/public/uploads/52e6bfe9-0714-4b1b-b0bd-582714f9ae38optimized_images/500x185_optimized_image.jpg',
        imageAlt:
          'An arial shot of the borough building with mountains visible in the background.',
        text: 'Learn about the different taxes in the Borough, including real property, business inventory, and more. Make payments easily online, by mail, or in person at our Palmer and Wasilla dropboxes.',
        linkUrl: '',
      },
    ],
    [
      {
        title: 'Disaster Preparedness',
        imageUrl:
          'https://d1159zutbdy4l.cloudfront.net/public/uploads/152e1e73-40bf-4250-afeb-5523330b54b5optimized_images/500x185_optimized_image.jpg',
        imageAlt: 'Image of a ferret',
        text: "Disasters can strike at any time. Learn how to prepare and protect your family, home, and business, ensuring you're ready for any emergency.",
        linkUrl: 'https://animalcare.matsugov.us/',
      },
      {
        title: 'Report a problem',
        imageUrl:
          'https://d1159zutbdy4l.cloudfront.net/public/uploads/42819dcd-aeda-4b37-b44b-63e87ff7a054optimized_images/500x332_optimized_image.jpg',
        imageAlt: 'A road with an intersection and moderate traffic',
        text: "Help keep our community safe and clean. Report non-emergency issues like road maintenance, abandoned vehicles, or animal concerns, and we'll take care of the rest.",
        linkUrl: '',
      },
    ],
  ];
  return (
    <section className="usa-graphic-list usa-section usa-section--dark">
      {/* <GridContainer>
        {highlights.map((row) => (
          <Grid
            row
            gap
            className="usa-graphic-list__row"
            key={crypto.randomUUID()}
          >
            {row.map((item) => (
              <Grid
                tablet={{
                  col: true,
                }}
                className="usa-media-block"
                key={item.title}
              >
                <img
                  className="usa-media-block__img circle-10"
                  style={{ objectFit: 'cover' }}
                  src={item.imageUrl}
                  alt={item.imageAlt}
                />
                <MediaBlockBody>
                  <Link href={item.linkUrl}>
                    <h2 className="usa-graphic-list__heading">{item.title}</h2>
                  </Link>
                  <p>{item.text}</p>
                </MediaBlockBody>
              </Grid>
            ))}
          </Grid>
        ))}
      </GridContainer> */}
    </section>
  );
}
