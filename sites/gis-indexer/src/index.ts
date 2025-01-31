import { APIGatewayEvent, Callback, Context } from 'aws-lambda';
import Typesense from 'typesense';

type ArcGISItem = {
  id: string;
  owner: string;
  created: number;
  modified: number;
  guid: null | string;
  name: null | string;
  title: string;
  type: string;
  typeKeywords: string[];
  description: string;
  tags: string[];
  snippet: string;
  thumbnail: string;
  documentation: null | string;
  extent: number[][];
  categories: string[];
  spatialReference: null | string;
  accessInformation: string;
  licenseInfo: string;
  culture: string;
  properties: {
    schemaVersion: number;
    children: string[];
    collaborationGroupId: string;
    contentGroupId: string;
    followersGroupId: string;
    parentInitiativeId: string;
  };
  advancedSettings: null | string;
  url: string;
  proxyFilter: null | string;
  access: string;
  size: number;
  subInfo: number;
  appCategories: string[];
  industries: string[];
  languages: string[];
  largeThumbnail: null | string;
  banner: null | string;
  screenshots: string[];
  listed: boolean;
  numComments: number;
  numRatings: number;
  avgRating: number;
  numViews: number;
  scoreCompleteness: number;
  groupDesignations: null | number;
  apiToken1ExpirationDate: number;
  apiToken2ExpirationDate: number;
  lastViewed: number;
};

type TypeSensePageDocument = {
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

const tsClient = new Typesense.Client({
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

export async function handler(
  event: APIGatewayEvent | null,
  context: Context | null,
  callback: Callback,
) {
  const res = await fetch(
    'https://www.arcgis.com/sharing/rest/search?q=(type:"Hub Site Application" OR type:"Dashboard" OR type:"Experience Builder" OR type:"StoryMap") AND access:public AND orgid:fX5IGselyy1TirdY&f=json&num=100',
  );

  const data = await res.json();
  const formatted: TypeSensePageDocument[] = data?.results?.map(
    (item: ArcGISItem): TypeSensePageDocument => {
      return {
        id: item.id,
        title: item.title,
        slug: item.title.toLowerCase().replace(/ /g, '-'),
        description: item.snippet,
        published_at: item.created / 1000,
        tags: item.tags,
        url: item.url,
        type: item.type,
      };
    },
  );

  const tsRes = await tsClient
    .collections('pages')
    .documents()
    .import(formatted, { action: 'upsert' });

  const response = {
    statusCode: 200,
    body: { message: 'successfully imported.' },
  };

  return callback(null, response);
}
