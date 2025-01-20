import 'dotenv/config';
import { request, ApiKeyManager } from '@esri/arcgis-rest-request';

export async function handler(): Promise<void> {
  const authentication = ApiKeyManager.fromKey(
    process.env.ESRI_API_KEY as string,
  );
  const url =
    'https://www.arcgis.com/sharing/rest/portals/19ccd04ffc8b432bbea44b6c727dc424';

  const res = await request(`${url}/community/users`, {
    authentication,
    httpMethod: 'GET',
    params: {
      f: 'json',
      q: 'freedom',
    },
  });

  console.log(res);
}

handler();
