import Typesense from 'typesense';
import { CollectionCreateSchema } from 'typesense/lib/Typesense/Collections';
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

export const COLLECTIONS: CollectionCreateSchema[] = [
  {
    name: TYPESENSE_COLLECTIONS.SERVICES,
    fields: [
      { name: 'id', type: 'string' },
      { name: 'title', type: 'string' },
      { name: 'description', type: 'string' },
      { name: 'body', type: 'string' },
      { name: 'slug', type: 'string' },
      { name: 'action_label', type: 'string' },
      { name: 'publish_at', type: 'int64[]' },
      { name: 'tags', type: 'string[]' },
    ],
  },
];
