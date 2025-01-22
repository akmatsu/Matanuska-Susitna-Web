import { TYPESENSE_CLIENT, TYPESENSE_COLLECTIONS } from '../typesense';
import { CollectionCreateSchema } from 'typesense/lib/Typesense/Collections';

const ServiceCollection: CollectionCreateSchema = {
  name: TYPESENSE_COLLECTIONS.SERVICES,
  fields: [
    { name: 'id', type: 'string' },
    { name: 'title', type: 'string' },
    { name: 'description', type: 'string' },
    { name: 'body', type: 'string' },
    { name: 'slug', type: 'string' },
    { name: 'owner', type: 'string' },
    { name: 'action_label', type: 'string' },
    { name: 'published_at', type: 'int32' },
    { name: 'tags', type: 'string[]' },
  ],
};

async function createServiceCollection(collection: CollectionCreateSchema) {
  try {
    const exists = await TYPESENSE_CLIENT.collections(collection.name).exists();
    if (!exists) {
      await TYPESENSE_CLIENT.collections().create(collection);
      console.log(`Collection ${collection.name} created successfully`);
    }
  } catch (error: any) {
    if (error.httpStatus === 409) {
      console.warn(`Collection ${collection.name} already exists`);
    } else {
      console.error(`Error creating collection ${collection.name}:`, error);
    }
  }
}

createServiceCollection(ServiceCollection);
