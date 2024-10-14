import { CardBody, CardHeader } from '@trussworks/react-uswds';
import { LinkCard } from '../LinkCard/LinkCard';
import { CorePagination } from '../CorePagination/CorePagination';
import { GET_SERVICES_QUERY } from '@/utils/gql/queries/getServices';
import { fetchGraphQL } from '@/utils/gql/fetchGraphQL';

export async function ServicesList({ limit = 15, page = 1, search = '' }) {
  const res = await fetchGraphQL(GET_SERVICES_QUERY, {
    take: limit,
    skip: (page - 1) * limit,
    where: {
      OR: [
        { description: { contains: search, mode: 'insensitive' } },
        { title: { contains: search, mode: 'insensitive' } },
      ],
    },
  });

  if (res.services?.length) {
    return (
      <>
        <h1>Services</h1>
        <ul className="usa-list--unstyled">
          {res.services.map((service) => (
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
          currentPage={1}
          totalPages={Math.ceil(res.servicesCount / limit)}
        />
      </>
    );
  } else {
    return (
      <>
        <h1>Services</h1>
        <p>No Results.</p>
      </>
    );
  }
}
