type Point = {
  x: number;
  y: number;
};

type FeatureAttributes = {
  objectid: number;
  globalid: string;
  CreationDate: number;
  Creator: string;
  EditDate: number;
  Editor: string;
  _date: number;
  name: string;
  trail_maintenance_partner: string;
  trails_maintained: string;
  current_weather: string;
  date_of_last_snowfall: number;
  depth_of_last_snowfall: string;
  current_loose_snow_base: string;
  packed_trail_base: string;
  trail_conditions: string;
  date_of_last_grooming: number;
  trail_closures: string;
  hazards: string;
  describe_hazard: string;
  comments: string;
};

interface TrailUpdateInfoFieldDomain {
  type: string;
  name: string;
  codedValues: Array<TrailUpdateInfoFieldDomainCodedValue>;
}

interface TrailUpdateInfoFieldDomainCodedValue {
  name: string;
  code: string;
}

interface TrailUpdateInfoField {
  name: string;
  type: string;
  alias: string;
  sqlType: string;
  length?: number;
  domain: TrailUpdateInfoFieldDomain | null;
  defaultValue: any;
}

interface TrailUpdateInfoSpatialReference {
  wkid: number;
  latestWkid: number;
}

interface TrailUpdateInfoUniqueIdField {
  name: string;
  isSystemMaintained: boolean;
}

interface TrailUpdateInfoFeature {
  attributes: FeatureAttributes;
  geometry: Point;
}

interface TrailUpdateInfo {
  objectIdFieldName: string;
  globalIdFieldName: string;
  geometryType: string;
  uniqueIdField: TrailUpdateInfoUniqueIdField;
  spatialReference: TrailUpdateInfoSpatialReference;
  fields: Array<TrailUpdateInfoField>;
  features: Array<TrailUpdateInfoFeature>;
}

export default async function TrailsUpdatesPage() {
  const res = await fetch(
    'https://services.arcgis.com/fX5IGselyy1TirdY/arcgis/rest/services/survey123_93749356aa2b46008e16a7d4eb986373_results/FeatureServer/0/query?where=1%3D1&objectIds=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&relationParam=&returnGeodetic=false&outFields=*&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&defaultSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&collation=&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnTrueCurves=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pjson&token=',
  );
  if (!res.ok) {
    throw new Error('Failed to fetch trail updates');
  }
  const data: TrailUpdateInfo | null | undefined = await res.json();

  if (!data) {
    throw new Error('Invalid data format received');
  }

  console.log(data);
  return <div>Trails updates page!</div>;
}
