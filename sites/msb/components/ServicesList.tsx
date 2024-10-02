'use client';
import { fetchGraphQL, gql } from '@/utils/graphql';
import { CardHeader } from '@trussworks/react-uswds';
import { LinkCard } from './LinkCard';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export async function ServicesList() {
  const params = useSearchParams();
  const pageParam = params.get('page');
  const limit = 25;
  const page = pageParam ? parseInt(pageParam) : 1;

  const skip = page * 25;

  const services = await fetchGraphQL<{
    data: {
      services: { id: string; title: string; description: string }[];
    };
  }>(
    gql`
      query GetServices($take: int, $skip: int!) {
        services(take: $take, skip: $skip) {
          id
          title
          description
        }
        servicesCount
      }
    `,
    {
      take: limit,
      skip,
    },
  );

  return (
    <ul className="usa-list--unstyled">
      {services?.data?.services.map((service) => (
        <li className="margin-bottom-2">
          <LinkCard href={`/services/${service.id}`}>
            <CardHeader className="padding-top-2">
              <h4 className="usa-card__heading margin-top-0">
                {service.title}
              </h4>
              <p>{service.description}</p>
            </CardHeader>
          </LinkCard>
        </li>
      ))}
    </ul>
  );
}
