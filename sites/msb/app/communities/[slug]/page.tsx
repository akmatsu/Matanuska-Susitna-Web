import { Meetings } from '@/components';
import { MapWrapper } from '@/components/MapWrapper';
import { getClient } from '@/utils/apollo/ApolloClient';
import {
  GET_COMMUNITY_META_QUERY,
  GET_COMMUNITY_QUERY,
} from '@msb/js-sdk/queries';
import { LinkCard, CardBody, CardHeader, CardTitle, Hero } from '@matsugov/ui';
import { Metadata } from 'next';
import Link from 'next/link';

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;

  const { data } = await getClient().query({
    query: GET_COMMUNITY_META_QUERY,
    variables: {
      where: { slug: params.slug },
    },
    context: {
      fetchOptions: {
        next: {
          revalidate: 300,
        },
      },
    },
  });

  return {
    title: `MSB - ${data?.community.title}`,
    description: data?.community.description,
  };
}

export default async function Community(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const { data, errors } = await getClient().query({
    query: GET_COMMUNITY_QUERY,
    variables: {
      where: { slug: params.slug },
    },

    context: {
      fetchOptions: {
        next: {
          revalidate: 300,
        },
      },
    },
  });

  const community = data?.community;

  if (errors) {
    return (
      <div>
        There was an error
        {errors.map((error) => {
          return <div key={error.message}>{error.message}</div>;
        })}
      </div>
    );
  }

  return (
    <div>
      <Hero image={community.heroImage || undefined} />
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-12 gap-16">
        <div className="col-span-8 flex flex-col gap-16">
          <div>
            <h1 className="mb-4 text-6xl font-bold">{community.title}</h1>
            <p>{community.description}</p>
          </div>

          <section>
            <h2 className="mb-4 text-3xl font-bold">Services</h2>
            <ul className="grid grid-cols-2 gap-4">
              {community.services.map((service) => (
                <LinkCard
                  as="li"
                  linkAs={Link}
                  href={`/services/${service.slug}`}
                  className="h-full"
                  key={service.id}
                >
                  <CardHeader>
                    <CardTitle>{service.title}</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <p className="truncate">{service.description}</p>
                  </CardBody>
                </LinkCard>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-3xl font-bold">Events</h2>
            <Meetings />
          </section>
        </div>
        <div className="col-span-4 flex flex-col gap-4">
          <section>
            <h3 className="text-2xl font-bold mb-4">Map</h3>
            <div className="aspect-[1/1] w-full overflow-hidden border rounded">
              <MapWrapper
                layerId="cc6808c179cc4f3ba282814afdc3882c"
                layerUrl="https://maps.matsugov.us/map/rest/services/OpenData/Administrative_Communities/FeatureServer"
                layerOpacity={0.5}
                itemKey="CC_NAME"
                itemId={community.title.toUpperCase()}
              />
            </div>
          </section>

          <section>
            <h3 className="text-2xl font-bold">Districts</h3>
            <ul>
              {community.districts.map((district) => (
                <LinkCard
                  as="li"
                  key={district.slug}
                  className="my-2"
                  href={`/districts/${district.slug}`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-4">
                      <CardHeader>
                        <CardTitle>{district.title}</CardTitle>
                      </CardHeader>
                      <CardBody>
                        <div>
                          <p>{district.description}</p>
                        </div>
                      </CardBody>
                    </div>
                    <div className="pr-6">
                      <img
                        src={district.photo?.file.url}
                        className="rounded-full size-20"
                      />
                    </div>
                  </div>
                </LinkCard>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
