import { APIGatewayEvent, Callback, Context } from 'aws-lambda';
import Typesense from 'typesense';
import chromium from 'chrome-aws-lambda';
import puppeteer, { Browser } from 'puppeteer-core';

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
    'https://www.arcgis.com/sharing/rest/search?q=(type:"Hub Site Application" OR type:"StoryMap") AND access:public AND orgid:fX5IGselyy1TirdY&f=json&num=100',
  );

  const data = await res.json();
  const formatted: TypeSensePageDocument[] = await Promise.all(
    data?.results?.map(
      async (item: ArcGISItem): Promise<TypeSensePageDocument> => {
        console.log('Crawling: ', item.url);

        let pageBody = '';

        if (item.url) {
          pageBody = await fetchRenderedContent(item.url);
        }

        return {
          id: item.id,
          title: item.title,
          slug: item.title.toLowerCase().replace(/ /g, '-'),
          description: item.snippet,
          body: pageBody,
          published_at: item.created / 1000,
          tags: item.tags,
          url: item.url,
          type: item.type,
        };
      },
    ),
  );

  await tsClient
    .collections('pages')
    .documents()
    .import(formatted, { action: 'upsert' });

  const response = {
    statusCode: 200,
    body: { message: 'successfully imported GIS applications.' },
  };

  return callback(null, response);
}

async function fetchRenderedContent(url: string) {
  let browser: Browser | null = null;

  try {
    let executablePath = await chromium.executablePath;
    if (!executablePath) {
      executablePath = process.env.CHROME_EXECUTABLE_PATH!;
      if (!executablePath) {
        throw new Error('Chromium executable path not found');
      }
    }

    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: executablePath,
      headless: chromium.headless,
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
    const content = await page.content();
    return content;
  } catch (err) {
    console.error(`Error fetching rendered content for ${url}: `, err);
    return '';
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
