import { CorePagination } from '../CorePagination';
import { GET_SERVICES_QUERY } from '@/utils/gql/queries/getServices';
import { fetchGraphQL } from '@/utils/gql/fetchGraphQL';
import { ServiceListItem } from './ServiceListItem';

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

  return (
    <>
      <h1>Services</h1>
      {res.services?.length ? (
        <>
          <ul className="usa-list--unstyled">
            {res.services.map((service: any) => (
              <ServiceListItem service={service} key={service.id} />
            ))}
          </ul>
          <CorePagination
            currentPage={1}
            totalPages={Math.ceil(res.servicesCount / limit)}
          />
        </>
      ) : (
        <p>No Results.</p>
      )}
    </>
  );
}
