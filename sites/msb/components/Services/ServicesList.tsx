import { CorePagination } from '../CorePagination';
import { GET_SERVICES_QUERY } from '@/utils/apollo/queries/getServices';

import { ServiceListItem } from './ServiceListItem';
import { getClient } from '@/utils/apollo/ApolloClient';

export async function ServicesList({ limit = 15, page = 1, search = '' }) {
  const { data } = await getClient().query({
    query: GET_SERVICES_QUERY,
    variables: {
      take: limit,
      skip: (page - 1) * limit,
      where: {
        OR: [
          { description: { contains: search, mode: 'insensitive' } },
          { title: { contains: search, mode: 'insensitive' } },
        ],
      },
    },
  });

  return (
    <>
      <h1>Services</h1>
      {data.services?.length ? (
        <>
          <ul className="usa-list--unstyled">
            {data.services.map((service: any) => (
              <ServiceListItem service={service} key={service.id} />
            ))}
          </ul>
          <CorePagination
            currentPage={1}
            totalPages={Math.ceil(data.servicesCount / limit)}
          />
        </>
      ) : (
        <p>No Results.</p>
      )}
    </>
  );
}
