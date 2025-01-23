import {
  ApolloClient,
  gql,
  InMemoryCache,
} from '@keystone-6/core/admin-ui/apollo';
import { parseServicesTypeSenseSchema } from '../schema/models/Service';
import { TYPESENSE_CLIENT, TYPESENSE_COLLECTIONS } from '../typesense';

async function importServices() {
  const client = new ApolloClient({
    uri: 'http://localhost:3333/api/graphql',
    cache: new InMemoryCache(),
  });

  console.log('Fetching services...');
  const services = await client.query({
    query: gql`
      query Service {
        services {
          id
          title
          description
          body
          slug
          actionLabel
          publishAt
          tags {
            name
          }
        }
      }
    `,
  });

  console.log('Formatting services...');
  const formatted = services.data.services.map((service: any) =>
    parseServicesTypeSenseSchema(service),
  );

  console.log('Importing services...');

  formatted.forEach(async (service: any) => {
    try {
      console.log('Importing service', service.id);
      await TYPESENSE_CLIENT.collections(TYPESENSE_COLLECTIONS.SERVICES)
        .documents()
        .upsert(service);
    } catch (error: any) {
      console.error('Error importing service', error);
    }
  });
}

importServices();
