import { TYPESENSE_CLIENT } from '../typesense';

async function removeCollection() {
  const collectionName = process.argv[2];

  if (!collectionName) throw new Error('Collection name is required');

  if (!(await TYPESENSE_CLIENT.collections(collectionName).exists())) {
    console.warn(`Collection ${collectionName} does not exist. Skipping...`);
    return;
  }

  console.log(`Removing collection ${collectionName}...`);
  await TYPESENSE_CLIENT.collections(collectionName).delete();
  console.log(`Collection ${collectionName} removed successfully`);
}

removeCollection();
