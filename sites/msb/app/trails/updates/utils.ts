import { format, subMonths } from 'date-fns';

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
  /**
   * @deprecated Use {@link FeatureAttributes.trail_conditions_|trail_conditions_} instead
   *
   * TODO: Remove this field after ensuring no dependencies exist.
   */
  trail_conditions?: string | null;
  trail_conditions_?: string | null;
  date_of_last_grooming: number;
  trail_closures: string;
  hazards: string;
  describe_hazard: string;
  comments: string;
  system_name?: string;
  system_name_other?: string;
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

export async function getTrailUpdates(opts?: {
  maintainer?: string;
  query?: string;
  date?: string;
}) {
  const filters: string[] = [];

  if (opts?.maintainer) {
    const maintainerValue = opts.maintainer.replace(/'/g, "''");
    filters.push(`trail_maintenance_partner='${maintainerValue}'`);
  }

  const queryText = opts?.query?.trim();
  if (queryText) {
    const sanitizedQuery = queryText.replace(/'/g, "''");
    const searchableFields = [
      'globalid',
      'Creator',
      'Editor',
      'name',
      'trail_maintenance_partner',
      'trails_maintained',
      'current_weather',
      'depth_of_last_snowfall',
      'current_loose_snow_base',
      'packed_trail_base',
      'trail_conditions',
      'trail_closures',
      'hazards',
      'describe_hazard',
      'comments',
    ];

    const queryConditions = searchableFields.map(
      (field) => `UPPER(${field}) LIKE UPPER('%${sanitizedQuery}%')`,
    );

    filters.push(`(${queryConditions.join(' OR ')})`);
  }

  let where = filters.length ? filters.join(' AND ') : '1=1';
  where += ` AND _date >= '${opts?.date || format(subMonths(new Date(), 1), 'yyyy-MM-dd')}'`;

  const url = new URL(
    'https://services.arcgis.com/fX5IGselyy1TirdY/arcgis/rest/services/survey123_93749356aa2b46008e16a7d4eb986373_results/FeatureServer/0/query',
  );

  const query = new URLSearchParams({
    where,
    objectIds: '',
    geometry: '',
    geometryType: 'esriGeometryEnvelope',
    inSR: '',
    spatialRel: 'esriSpatialRelIntersects',
    resultType: 'none',
    distance: '0.0',
    units: 'esriSRUnit_Meter',
    relationParam: '',
    returnGeodetic: 'false',
    outFields: '*',
    returnGeometry: 'false',
    featureEncoding: 'esriDefault',
    multipatchOption: 'xyFootprint',
    maxAllowableOffset: '',
    geometryPrecision: '',
    outSR: '',
    defaultSR: '',
    datumTransformation: '',
    applyVCSProjection: 'false',
    returnIdsOnly: 'false',
    returnUniqueIdsOnly: 'false',
    returnCountOnly: 'false',
    returnExtentOnly: 'false',
    returnQueryGeometry: 'false',
    returnDistinctValues: 'false',
    cacheHint: 'false',
    collation: '',
    orderByFields: '_date DESC',
    outStatistics: '',
    having: '',
    resultOffset: '0',
    resultRecordCount: '25',
    returnZ: 'false',
    returnM: 'false',
    returnTrueCurves: 'false',
    returnExceededLimitFeatures: 'true',
    quantizationParameters: '',
    sqlFormat: 'none',
    f: 'pjson',
    token: '',
  });

  url.search = query.toString();

  const res = await fetch(url.toString());
  if (!res.ok) {
    console.log(res);
    throw new Error(`Failed to fetch trail updates: ${res.statusText}`);
  }
  const data = (await res.json()) as TrailUpdateInfo;
  if (!data) {
    throw new Error('Invalid data format received');
  }

  return data;
}
