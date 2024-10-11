'use client';
import React from 'react';

import { Card, CardBody, CardHeader } from '@trussworks/react-uswds';
import { LinkCard } from './LinkCard';
import { CorePagination } from './CorePagination/CorePagination';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useSuspenseQuery } from '@apollo/client';
import { GET_SERVICES_QUERY } from '@/utils/apollo/gqlQueries/getServices';
import { usePageParam } from '@/hooks/usePageParam';

export function ServicesList() {
  const page = usePageParam();
  const limit = 2;
  const skip = (page - 1) * limit;

  const { data } = useSuspenseQuery(GET_SERVICES_QUERY, {
    variables: { take: limit, skip },
  });

  return (
    <>
      <h1>Services</h1>
      <ul className="usa-list--unstyled">
        {data.services.map((service) => (
          <LinkCard
            className="margin-bottom-2"
            href={`/services/${service.slug}`}
            key={service.id}
          >
            <CardHeader className="padding-top-2">
              <h4 className="usa-card__heading margin-bottom-0">
                {service.title}
              </h4>
              <CardBody>
                <p>{service.description}</p>
              </CardBody>
            </CardHeader>
          </LinkCard>
        ))}
      </ul>
      <CorePagination
        currentPage={page}
        totalPages={Math.ceil(data.servicesCount / limit)}
      />
    </>
  );
}

export function ServicesListLoading() {
  const page = usePageParam();

  return (
    <>
      <h1>Services</h1>
      <ul className="usa-list--unstyled">
        {Array.from({ length: 15 }, (_, index) => (
          <Card key={index} className="usa-card margin-bottom-2">
            <CardHeader className="padding-top-2">
              <Skeleton
                className="usa-card__heading margin-top-0"
                baseColor="#ccc"
                highlightColor="#f0f0f0"
                borderRadius={0}
              />
            </CardHeader>

            <CardBody>
              <p>
                <Skeleton
                  count={2}
                  baseColor="#ccc"
                  highlightColor="#f0f0f0"
                  borderRadius={0}
                />
              </p>
            </CardBody>
          </Card>
        ))}
      </ul>
      <CorePagination currentPage={page} />
    </>
  );
}
