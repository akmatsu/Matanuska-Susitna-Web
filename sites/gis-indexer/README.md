# GIS indexer

This is a lambda function that pulls down public apps from our GIS organization and indexes them in Typesense.

## Deployment

### 1. Build

```bash
pnpm run build
```

### 2. Zip

```bash
cd dist
zip -r gis-indexer.zip dist
```

### Deploy

Navigation to the [lambda function](https://us-west-2.console.aws.amazon.com/lambda/home?region=us-west-2#/functions/GISIndexer/versions/8?tab=testing) in the AWS console and upload the zip file.
