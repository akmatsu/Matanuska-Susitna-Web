import { Hero } from '@matsugov/ui';
import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';

const HeroImage = gql(`
  fragment HeroImage on BasePage {
    heroImage
  }
`);

/** Maps the Keystone GraphQL hero image fragment to its image URL. */
export function toHeroImage(ref?: FragmentType<typeof HeroImage> | null) {
  return getFragmentData(HeroImage, ref)?.heroImage ?? null;
}

export function PageHeroImageView(props: { image?: string | null }) {
  if (!props.image) {
    return null;
  }

  return <Hero image={props.image} />;
}

export function PageHeroImage(props: {
  page?: FragmentType<typeof HeroImage> | null;
}) {
  return <PageHeroImageView image={toHeroImage(props.page)} />;
}
