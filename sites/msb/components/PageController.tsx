import { getClient } from '@/utils/apollo/ApolloClient';
import { PageMerged, PageType, TrailItem } from '@msb/js-sdk';
import { TypedDocumentNode } from '@msb/js-sdk/apollo';
import { redirect } from 'next/navigation';
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Hero,
  InPageNavigation,
  LinkCard,
} from '@matsugov/ui';
import { PageActions } from './PageActions';
import { PageContacts } from './PageContacts';
import { PageBody } from './PageBody';
import clsx from 'clsx';
import { Meetings } from './Meetings';
import { FeaturedContent } from './landing';
import { PageServices } from './PageServices';
import pluralize from 'pluralize';
import { PageProps } from '@/types';
import { ComponentProps } from 'react';
import { MapWrapper } from './MapWrapper';
import { toTitleCase } from '@/utils/stringHelpers';
import { PageTrailInfo } from './PageTrailInfo';

/**
 * The page controller is the primary component for controlling most pages.
 */
export default async function PageController({
  query,
  listName,
  sideNav,
  map,
  ...props
}: {
  query: TypedDocumentNode<any, { where: { slug: string } }>;
  listName: PageType;
  sideNav?: boolean;
  map?: ComponentProps<typeof MapWrapper>;
  params: PageProps['params'];
}) {
  const { slug } = await props.params;

  const { data, errors, error } = await getClient().query({
    query,
    variables: {
      where: { slug },
    },
    context: {
      fetchOptions: {
        next: {
          revalidate: 300,
        },
      },
    },
  });

  if (error) {
    console.error('Apollo query failed: ', JSON.stringify(errors));
    throw error;
  }

  const page: PageMerged | undefined = data?.[listName];

  if (!page) {
    redirect('/not-found');
  }

  return (
    <>
      {page.heroImage && <Hero image={page.heroImage} />}
      <div className="max-w-7xl mx-auto px-4 py-16 relative">
        {page && (
          <div className="grid grid-cols-12 gap-8">
            {sideNav && (
              <div className="col-span-3">
                <InPageNavigation />
              </div>
            )}
            <div
              className={clsx('flex flex-col gap-8', {
                'col-span-6': sideNav,
                'col-span-8': !sideNav,
              })}
            >
              <PageBody
                title={page.title}
                description={page.description}
                body={page.body}
              />

              <PageServices
                services={page.services}
                filters={{
                  [listName === 'orgUnit'
                    ? 'departments'
                    : pluralize(listName)]: [page.title],
                }}
              />
              {listName !== 'service' && (
                <section>
                  <h2 className="text-2xl font-bold mb-4">Events</h2>
                  <Meetings />
                </section>
              )}
              {listName !== 'service' && (
                <section>
                  <h2 className="text-2xl font-bold mb-4">Announcements</h2>
                  <FeaturedContent />
                </section>
              )}
            </div>
            <div
              className={clsx({
                'col-span-3': sideNav,
                'col-span-4': !sideNav,
              })}
            >
              <aside className="flex flex-col gap-8">
                {!!map && (
                  <section>
                    <h2 className="text-2xl font-bold mb-4">Map</h2>
                    <div className="aspect-[1/1] w-full overflow-hidden border rounded">
                      <MapWrapper {...map} itemId={page.title.toUpperCase()} />
                    </div>
                  </section>
                )}
                {page.primaryAction && (
                  <PageActions primaryAction={page.primaryAction} />
                )}
                {!!page.address && (
                  <section>
                    <h2 className="text-2xl font-bold mb-4">Address</h2>
                    <div className="flex flex-col">
                      <Card>
                        <CardHeader>
                          <CardTitle as="h4">{page.address.title}</CardTitle>
                        </CardHeader>
                        <CardBody>
                          <p>{page.address.lineOne},</p>
                          {page.address.lineTwo && (
                            <p>{page.address.lineTwo}</p>
                          )}
                          <p>
                            {page.address.city}, {page.address.state},{' '}
                            {page.address.zip}
                          </p>
                        </CardBody>
                      </Card>
                    </div>
                  </section>
                )}
                {!!page.hours?.length && (
                  <section>
                    <h2 className="text-2xl font-bold mb-4">Hours</h2>
                    <div className="flex flex-col gap-4">
                      <Card>
                        <CardBody>
                          <div className="flex flex-col gap-2">
                            {page.hours.map((hour) => (
                              <div key={hour.day}>
                                <p className="font-bold">
                                  {toTitleCase(hour.day.replace(/-/g, ' '))}
                                </p>
                                <p className="text-sm">
                                  {hour.open} - {hour.close}
                                </p>
                              </div>
                            ))}
                          </div>
                        </CardBody>
                      </Card>
                    </div>
                  </section>
                )}
                {(page.contacts?.length > 0 || page.primaryContact) && (
                  <section>
                    <h2 className="text-2xl font-bold mb-4">Contacts</h2>
                    <PageContacts
                      primaryContact={page.primaryContact}
                      contacts={page.contacts}
                    />
                  </section>
                )}
                {listName === 'trail' && (
                  <PageTrailInfo trail={page as TrailItem} />
                )}
                {!!page.trails?.length && (
                  <section>
                    <h2 className="text-2xl font-bold mb-4">Trails</h2>
                    <ul>
                      {page.trails.map((trail) => (
                        <LinkCard
                          as="li"
                          key={trail.slug}
                          className="my-2"
                          href={`/trails/${trail.slug}`}
                        >
                          <div className="flex justify-between items-center">
                            <div className="flex flex-col gap-4">
                              <CardHeader>
                                <CardTitle>{trail.title}</CardTitle>
                              </CardHeader>
                              <CardBody>
                                <p className="truncate">{trail.description}</p>
                              </CardBody>
                            </div>
                          </div>
                        </LinkCard>
                      ))}
                    </ul>
                  </section>
                )}
                {!!page.facilities?.length && (
                  <section>
                    <h2 className="text-2xl font-bold mb-4">Trails</h2>
                    <ul>
                      {page.facilities.map((fac) => (
                        <LinkCard
                          as="li"
                          key={fac.slug}
                          className="my-2"
                          href={`/trails/${fac.slug}`}
                        >
                          <div className="flex justify-between items-center">
                            <div className="flex flex-col gap-4">
                              <CardHeader>
                                <CardTitle>{fac.title}</CardTitle>
                              </CardHeader>
                              <CardBody>
                                <p className="truncate">{fac.description}</p>
                              </CardBody>
                            </div>
                          </div>
                        </LinkCard>
                      ))}
                    </ul>
                  </section>
                )}
                {!!page.districts?.length && (
                  <section>
                    <h2 className="text-2xl font-bold mb-4">Districts</h2>
                    <ul>
                      {page.districts.map((district) => (
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
                )}
                {page.parent && (
                  <section>
                    <h2 className="text-2xl font-bold mb-4">
                      Parent Department
                    </h2>
                    <LinkCard href={`/departments/${page.parent.slug}`}>
                      <CardHeader>
                        <CardTitle>{page.parent.title}</CardTitle>
                      </CardHeader>
                      <CardBody>
                        <p className="truncate">{page.parent.description}</p>
                      </CardBody>
                    </LinkCard>
                  </section>
                )}
                {page.children?.length > 0 && (
                  <section>
                    <h2 className="text-2xl font-bold mb-4">Divisions</h2>
                    <ul className="flex flex-col gap-2">
                      {page.children.map((child) => (
                        <LinkCard href={`/departments/${child.slug}`}>
                          <CardHeader>
                            <CardTitle>{child.title}</CardTitle>
                          </CardHeader>
                          <CardBody>
                            <p className="truncate">{child.description}</p>
                          </CardBody>
                        </LinkCard>
                      ))}
                    </ul>
                  </section>
                )}
              </aside>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
