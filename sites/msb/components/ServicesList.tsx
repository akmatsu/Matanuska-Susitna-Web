'use client';
import React from 'react';
import { fetchGraphQL, gql } from '@/utils/graphql';
import { Card, CardBody, CardHeader } from '@trussworks/react-uswds';
import { LinkCard } from './LinkCard';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CorePagination } from './CorePagination/CorePagination';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

type Service = { id: string;, slug: string, title: string; description: string };

export function ServicesList() {
  const params = useSearchParams();
  const pageParam = params.get('page');
  const limit = 15;
  const page = pageParam ? parseInt(pageParam) : 1;
  const [services, setServices] = useState<Service[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const skip = (page - 1) * limit;

  useEffect(() => {
    getServices();
  }, [page]);

  function startLoading() {
    setLoading(true);
  }

  function stopLoading() {
    setLoading(false);
  }

  async function getServices() {
    try {
      startLoading();
      const res = await fetchGraphQL<{
        data: {
          services: Service[];
          servicesCount: number;
        };
      }>(
        gql`
          query GetServices($take: Int, $skip: Int!) {
            services(take: $take, skip: $skip) {
              id
              title
              slug
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

      if (res) {
        setServices(res.data.services);
        setTotal(res.data.servicesCount);
      }
    } catch {
      console.error('An error ocurred.');
    } finally {
      stopLoading();
    }
  }

  if (loading) {
    return (
      <>
        <h1>Services</h1>
        <ul className="usa-list--unstyled">
          {Array.from({ length: limit }, (_, index) => (
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

  return (
    <>
      <h1>Services</h1>
      <ul className="usa-list--unstyled">
        {services.map((service) => (
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
        totalPages={Math.ceil(total / limit)}
      />
    </>
  );
}
