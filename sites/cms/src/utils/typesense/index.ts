import Typesense from 'typesense';
import { CollectionCreateSchema } from 'typesense/lib/Typesense/Collections';
import 'dotenv/config';

export type TypeSensePageDocument = {
  id: string;
  title: string;
  slug: string;
  description?: string;
  body?: string;
  action_label?: string;
  published_at?: number;
  tags?: string[];
  url?: string;
  districts?: string[];
  type?: string;
};

export const TYPESENSE_COLLECTIONS = {
  PAGES: 'pages',
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
    name: TYPESENSE_COLLECTIONS.PAGES,
    fields: [
      { name: 'id', type: 'string' },
      { name: 'title', type: 'string', sort: true },
      { name: 'slug', type: 'string' },
      { name: 'description', type: 'string', optional: true },
      { name: 'body', type: 'string', optional: true },
      { name: 'action_label', type: 'string', optional: true },
      { name: 'published_at', type: 'int64', optional: true, sort: true },
      { name: 'tags', type: 'string[]', optional: true, facet: true },
      { name: 'url', type: 'string', optional: true },
      { name: 'districts', type: 'string[]', optional: true, facet: true },
      { name: 'type', type: 'string', optional: true, facet: true },
    ],
  },
];
