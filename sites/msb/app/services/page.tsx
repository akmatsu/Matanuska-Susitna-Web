import { fetchGraphQL, gql } from '@/utils/graphql';
import Link from 'next/link';

export default async function Services() {
  const services = await fetchGraphQL<{
    data: {
      services: { id: string; title: string }[];
    };
  }>(gql`
    query GetServices {
      services {
        id
        title
      }
    }
  `);

  return (
    <div>
      <ul className="usa-list--unstyled">
        {services?.data?.services.map((service: any) => (
          <li key={service.id}>
            <p>
              <Link href={`/services/${service.id}`}>{service.title}</Link>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
