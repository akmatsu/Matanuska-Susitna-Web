import { registerClient } from '@msb/js-sdk/client';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
export const { getClient, query, PreloadQuery } = await registerClient(API_URL);
