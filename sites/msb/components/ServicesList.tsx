import { fetchGraphQL, gql } from '@/utils/graphql';
import {
  Collection,
  CollectionDescription,
  CollectionHeading,
  CollectionItem,
} from '@trussworks/react-uswds';
import Link from 'next/link';

export async function ServicesList() {
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

  return (
    <Collection>
      {services?.data?.services.map((service) => (
        <CollectionItem key={service.id}>
          <CollectionHeading headingLevel="h4">
            <Link href={`/services/${service.id}`}>{service.title}</Link>
          </CollectionHeading>
          <CollectionDescription>{service.description}</CollectionDescription>
        </CollectionItem>
      ))}
    </Collection>
  );
}
