import { registerClient } from '@msb/js-sdk';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
export const { getClient, query, PreloadQuery } = registerClient(API_URL);
