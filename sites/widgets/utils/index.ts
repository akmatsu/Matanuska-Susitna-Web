import { registerClient } from '@msb/js-sdk/client';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333';
export const { getClient, query, PreloadQuery } = registerClient(API_URL);
