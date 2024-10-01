'use client';
import { fetchGraphQL, gql } from '@/utils/graphql';
import Link from 'next/link';
import {
  Collection,
  CollectionDescription,
  CollectionHeading,
  CollectionItem,
  Search,
} from '@trussworks/react-uswds';
import { ThreeColumnLayout } from '@/components/ThreeColumnLayout';

export default async function Services() {
  const services = await fetchGraphQL<{
    data: {
      services: { id: string; title: string; description: string }[];
    };
  }>(gql`
    query GetServices {
      services {
        id
        title
        description
      }
    }
  `);

  function handleSubmit() {
    console.log('search!');
  }

  return (
    <section className="usa-section">
      <ThreeColumnLayout
        leftCol={
          <div>
            <Search size="small" onSubmit={handleSubmit} />
          </div>
        }
        centerCol={
          <Collection>
            {services?.data?.services.map((service) => (
              <CollectionItem key={service.id}>
                <CollectionHeading headingLevel="h4">
                  <Link href={`/services/${service.id}`}>{service.title}</Link>
                </CollectionHeading>
                <CollectionDescription>
                  {service.description}
                </CollectionDescription>
              </CollectionItem>
            ))}
          </Collection>
        }
      />
    </section>
  );
}
