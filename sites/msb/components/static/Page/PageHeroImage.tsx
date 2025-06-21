import { Hero } from '@matsugov/ui';
import { FragmentType, getFragmentData, gql } from '@msb/js-sdk/gql';

const HeroImage = gql(`
  fragment HeroImage on BasePage {
    heroImage
  }
`);

export function PageHeroImage(props: {
  page?: FragmentType<typeof HeroImage> | null;
}) {
  const page = getFragmentData(HeroImage, props.page);

  if (!page?.heroImage) {
    return null;
  }

  return <Hero image={page.heroImage} />;
}
