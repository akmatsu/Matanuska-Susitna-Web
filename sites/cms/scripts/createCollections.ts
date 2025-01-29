import { TYPESENSE_CLIENT } from '../typesense';
import { CollectionCreateSchema } from 'typesense/lib/Typesense/Collections';
import { COLLECTIONS } from '../typesense';

async function createCollection(collection: CollectionCreateSchema) {
  try {
    const exists = await TYPESENSE_CLIENT.collections(collection.name).exists();
    if (!exists) {
      await TYPESENSE_CLIENT.collections().create(collection);
      console.log(`Collection ${collection.name} created successfully`);
    } else
      console.log(`Collection ${collection.name} already exists. Skipping...`);
  } catch (error: any) {
    if (error.httpStatus === 409) {
      console.warn(`Collection ${collection.name} already exists`);
    } else {
      console.error(`Error creating collection ${collection.name}:`, error);
    }
  }
}

COLLECTIONS.forEach((collections) => createCollection(collections));
