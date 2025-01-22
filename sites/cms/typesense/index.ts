import Typesense from 'typesense';
import 'dotenv/config';

export const TYPESENSE_COLLECTIONS = {
  SERVICES: 'services',
};

export const TYPESENSE_CLIENT = new Typesense.Client({
  nodes: [
    {
      host: process.env.TYPESENSE_HOST || 'localhost',
      port: process.env.TYPESENSE_PORT
        ? parseInt(process.env.TYPESENSE_PORT)
        : 8108,
      protocol: process.env.TYPESENSE_PROTOCOL || 'http',
    },
  ],
  apiKey: process.env.TYPESENSE_API_KEY || 'xyz',
  connectionTimeoutSeconds: 2,
});

// // Initialize collections
// const collections: CollectionCreateSchema[] = [
//   {
//     name: TYPESENSE_COLLECTIONS.SERVICES,
//     fields: [
//       { name: 'id', type: 'string' },
//       { name: 'title', type: 'string' },
//       { name: 'description', type: 'string' },
//       { name: 'body', type: 'string' },
//       { name: 'slug', type: 'string' },
//       { name: 'owner', type: 'string' },
//       { name: 'actionLabel', type: 'string' },
//       { name: 'publishedAt', type: 'int32' },
//       { name: 'tags', type: 'string[]' },
//     ],
//   },
// ];

// collections.forEach(async (collection) => {
//   try {
//     const exists = await TYPESENSE_CLIENT.collections(collection.name).exists();
//     if (!exists) {
//       await TYPESENSE_CLIENT.collections().create(collection);
//       console.log(`Collection ${collection.name} created successfully`);
//     }
//   } catch (error: any) {
//     if (error.httpStatus === 409) {
//       console.warn(`Collection ${collection.name} already exists`);
//     } else {
//       console.error(`Error creating collection ${collection.name}:`, error);
//     }
//   }
// });
