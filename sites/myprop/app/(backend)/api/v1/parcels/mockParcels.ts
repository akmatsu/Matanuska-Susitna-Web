import { faker } from '@faker-js/faker';

export type ParcelAppraisal = {
  YEAR_ID: number | null;
  LAND_APR: number | null;
  BLDG_APR: number | null;
  TOTAL_APR: number | null;
};

export type ParcelAssessment = {
  YEAR_ID: number | null;
  LAND_ASM: number | null;
  BLDG_ASM: number | null;
  TOTAL_ASM: number | null;
};

export type ParcelTaxBilling = {
  YEAR_ID: number | null;
  CURRENT_YEAR: number | null;
  YEAR_CERT: string | null;
  ZONE: string | null;
  MILL: string | null;
  'Tax Amount Billed': string | null;
};

export type ParcelRecordedDocument = {
  DEED_DATE: string | null;
  DEED_TYPE: string | null;
  DOC_LABEL: string | null;
  DOC_URL: string | null;
};

export type ParcelStructure = {
  BLDG_NBR: number | null;
  RES_UNITS: number | null;
  CONDITION: string | null;
  BASEMENT: string | null;
  YEAR_BUILT: number | null;
  FOUNDATION: string | null;
  SEPTIC: string | null;
  USE: string | null;
  DESIGN: string | null;
  CONST_TYPE: string | null;
  GRADE: string | null;
  WELL: string | null;
};

export type ParcelBuildingDetail = {
  ITM_BLDGID: string | null;
  ITM_DESC: string | null;
  ITM_AREA: string | null;
  ITM_DONE: string | null;
};

export type ParcelDetails = {
  PARCEL_ID: string;
  TAX_ID: string | null;
  TRS: string | null;
  LEGAL_DESC: string | null;
  SUBD_NAME: string | null;
  CITY: string | null;
  MAP: string | null;
  MAP2: string | null;
  CITE_ADDRESS: string | null;
  CITE_CITY: string | null;
  OWNER: string | null;
  OWNER_ADDRESS: string | null;
  BUYER: string | null;
  BUYER_ADDRESS: string | null;
  STATUS: string | null;
  BALANCE: number | null;
  FARM_DEFERMENT: number | null;
  DISABLED_VET: number | null;
  SENIOR: number | null;
  TOTAL: number | null;
  LID: string | null;
  GROSS_ACRE: number | null;
  NET_ACRE: number | null;
  DISTRICT: string | null;
  PRECINCT: string | null;
  FIRE_AREA: string | null;
  ROAD_AREA: string | null;
  LAST_UPDATED: string | null;
  APPRAISALS?: ParcelAppraisal[] | null;
  ASSESSMENTS?: ParcelAssessment[] | null;
  TAX_BILLING?: ParcelTaxBilling[] | null;
  RECORDED_DOCUMENTS?: ParcelRecordedDocument[] | null;
  STRUCTURES?: ParcelStructure[] | null;
  BUILDING_DETAILS?: ParcelBuildingDetail[] | null;
};

export const DEFAULT_PARCEL_COUNT = 50;
export const DEFAULT_PARCEL_SEED = 19475;
export const MAX_PARCEL_COUNT = 500;
const BASE_PARCEL_ID = 19475;
const CURRENT_YEAR = 2026;

type ParcelGeneratorOptions = {
  seed?: number;
  count?: number;
};

const districts = [
  'Assembly District 001',
  'Assembly District 002',
  'Assembly District 003',
  'Assembly District 004',
  'Assembly District 005',
  'Assembly District 006',
];

const fireAreas = [
  '120 Big Lake',
  '130 Central Mat-Su',
  '140 Meadow Lakes',
  '150 Talkeetna',
  '160 Willow',
];

const roadAreas = [
  '017 Knik RSA',
  '019 Big Lake RSA',
  '021 Meadow Lakes RSA',
  '024 Talkeetna RSA',
  '028 Willow RSA',
  'No Borough Road Service see the <a href=https://www.cityofwasilla.gov/298/Winter-Road-Maintenance>City of Wasilla Website</a>',
];

const statusValues = ['Current    ', 'Please Call', 'Delinquent', 'Pending'];

function pad(value: number, length: number) {
  return String(value).padStart(length, '0');
}

function formatDateMMDDYYYY(date: Date) {
  const month = pad(date.getMonth() + 1, 2);
  const day = pad(date.getDate(), 2);
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}

function formatIsoWithTenths(date: Date) {
  const isoBase = date.toISOString().replace('Z', '');
  const dotIndex = isoBase.indexOf('.');

  if (dotIndex === -1) {
    return `${isoBase}.0`;
  }

  return `${isoBase.slice(0, dotIndex)}.${isoBase.slice(dotIndex + 1, dotIndex + 2)}`;
}

function createTaxId(index: number) {
  return `56540B${pad((index % 98) + 1, 2)}L${pad((index % 899) + 1, 3)}`;
}

function createTrs(index: number) {
  const section = pad((index % 36) + 1, 2);
  const township = pad((index % 20) + 1, 2);
  const range = pad((index % 15) + 1, 2);
  return `S${section}N${township}W${range}`;
}

function createAppraisals(
  baseLand: number,
  baseBuilding: number,
): ParcelAppraisal[] {
  return [0, 1, 2].map((offset) => {
    const year = CURRENT_YEAR - offset;
    const landApr = Math.max(
      1000,
      baseLand - offset * faker.number.int({ min: 800, max: 1600 }),
    );
    const bldgApr = Math.max(
      1000,
      baseBuilding - offset * faker.number.int({ min: 1800, max: 4000 }),
    );
    return {
      YEAR_ID: year,
      LAND_APR: landApr,
      BLDG_APR: bldgApr,
      TOTAL_APR: landApr + bldgApr,
    };
  });
}

function createAssessments(appraisals: ParcelAppraisal[]): ParcelAssessment[] {
  return appraisals.map((appraisal) => ({
    YEAR_ID: appraisal.YEAR_ID,
    LAND_ASM: appraisal.LAND_APR,
    BLDG_ASM: appraisal.BLDG_APR,
    TOTAL_ASM: appraisal.TOTAL_APR,
  }));
}

function createTaxBilling(appraisals: ParcelAppraisal[]): ParcelTaxBilling[] {
  return appraisals.map((apr, index) => {
    const mill =
      index === 0
        ? '--'
        : faker.finance.amount({ min: 10.8, max: 14.9, dec: 3 });
    const billed =
      index === 0
        ? '--'
        : `$${faker.finance.amount({ min: 550, max: 1650, dec: 2 })}`;
    return {
      YEAR_ID: apr.YEAR_ID,
      CURRENT_YEAR: CURRENT_YEAR,
      YEAR_CERT: index === 0 ? 'No' : 'Yes',
      ZONE: pad(faker.number.int({ min: 1, max: 9999 }), 4),
      MILL: mill,
      'Tax Amount Billed': billed,
    };
  });
}

function createRecordedDocuments(): ParcelRecordedDocument[] {
  return Array.from({ length: 3 }, (_, index) => {
    const deedDate = faker.date.between({
      from: '1988-01-01',
      to: '2025-12-31',
    });
    const serialYear = deedDate.getFullYear();
    const serial = `${serialYear}-${pad(faker.number.int({ min: 1, max: 999999 }), 6)}-0`;
    const deedType = faker.helpers.arrayElement([
      'CLERKS DEED',
      'WARRANTY DEED (ALL TYPES)',
      'QUITCLAIM DEED (ALL TYPE)',
      'TRUSTEES DEED',
    ]);

    if (index === 1) {
      const book = faker.number.int({ min: 100, max: 999 });
      const page = faker.number.int({ min: 1, max: 999 });
      return {
        DEED_DATE: formatDateMMDDYYYY(deedDate),
        DEED_TYPE: deedType,
        DOC_LABEL: `Palmer  Bk: ${book} Pg: ${page}`,
        DOC_URL: `&SearchType=book&Book=${book}&Page=${page}`,
      };
    }

    return {
      DEED_DATE: formatDateMMDDYYYY(deedDate),
      DEED_TYPE: deedType,
      DOC_LABEL: `Palmer ${serial}`,
      DOC_URL: `&SearchType=doc&SerialNumber=${serial}`,
    };
  });
}

function createStructures(): ParcelStructure[] {
  return [
    {
      BLDG_NBR: 1,
      RES_UNITS: 0,
      CONDITION: 'Standard',
      BASEMENT: 'None',
      YEAR_BUILT: faker.number.int({ min: 1978, max: 2022 }),
      FOUNDATION: 'Concrete Block',
      SEPTIC: '',
      USE: 'Residential Garage',
      DESIGN: 'Garage',
      CONST_TYPE: 'Frame',
      GRADE: 'None',
      WELL: '',
    },
    {
      BLDG_NBR: 2,
      RES_UNITS: faker.helpers.arrayElement([1, 2, 4]),
      CONDITION: 'Standard',
      BASEMENT: 'None',
      YEAR_BUILT: faker.number.int({ min: 1978, max: 2022 }),
      FOUNDATION: 'Concrete Block',
      SEPTIC: faker.helpers.arrayElement(['', 'Septic C - Community Sept']),
      USE: faker.helpers.arrayElement(['Multi Family', 'Single Family']),
      DESIGN: faker.helpers.arrayElement(['Two Story', 'Ranch']),
      CONST_TYPE: 'Frame',
      GRADE: faker.helpers.arrayElement(['14.1', 'None']),
      WELL: faker.helpers.arrayElement(['', 'Well C - Community Water']),
    },
  ];
}

function createBuildingDetails(): ParcelBuildingDetail[] {
  return [
    {
      ITM_BLDGID: '0',
      ITM_DESC: faker.helpers.arrayElement([
        'Garage (10.3) Area - 11M',
        'Main Living Area - 2ST',
      ]),
      ITM_AREA: String(faker.number.int({ min: 600, max: 4000 })),
      ITM_DONE: '100',
    },
  ];
}

function createParcel(index: number): ParcelDetails {
  const parcelId = String(BASE_PARCEL_ID + index);
  const owner = faker.person.fullName().toUpperCase();
  const buyer = faker.datatype.boolean({ probability: 0.6 })
    ? null
    : faker.person.fullName().toUpperCase();
  const citeAddress = `${faker.number.int({ min: 1000, max: 99999 })} ${faker.location.streetAddress({ useFullAddress: false })}`;
  const ownerAddress = `${citeAddress.toUpperCase()}  WASILLA AK 99623-${pad(faker.number.int({ min: 1, max: 9999 }), 4)}`;

  const landBase = faker.number.int({ min: 12000, max: 65000 });
  const bldgBase = faker.number.int({ min: 90000, max: 620000 });
  const appraisals = createAppraisals(landBase, bldgBase);
  const assessments = createAssessments(appraisals);
  const taxBilling = createTaxBilling(appraisals);

  return {
    PARCEL_ID: parcelId,
    TAX_ID: createTaxId(index),
    TRS: createTrs(index),
    LEGAL_DESC: `${faker.helpers.arrayElement(['SKYLINE HTS', 'CREEKSIDE', 'MOUNTAIN VIEW', 'RIVER BEND'])} BLOCK ${faker.number.int({ min: 1, max: 12 })} LOT ${faker.number.int({ min: 1, max: 32 })}`,
    SUBD_NAME: faker.helpers.arrayElement([
      'SKYLINE HTS',
      'CREEKSIDE',
      'MOUNTAIN VIEW',
      'RIVER BEND',
      'SOUTHVIEW EXT',
    ]),
    CITY: faker.helpers.arrayElement(['Wasilla', 'Palmer', 'Houston']),
    MAP: `WA${pad(faker.number.int({ min: 1, max: 20 }), 2)}`,
    MAP2: `WA${pad(faker.number.int({ min: 0, max: 20 }), 2)}`,
    CITE_ADDRESS: citeAddress,
    CITE_CITY: '',
    OWNER: owner,
    OWNER_ADDRESS: ownerAddress,
    BUYER: buyer,
    BUYER_ADDRESS: buyer ? ownerAddress : null,
    STATUS: faker.helpers.arrayElement(statusValues),
    BALANCE: faker.number.float({ min: 0, max: 4000, fractionDigits: 2 }),
    FARM_DEFERMENT: 0,
    DISABLED_VET: faker.helpers.arrayElement([0, 0, 0, 0, 1]),
    SENIOR: faker.helpers.arrayElement([0, 0, 0, 0, 1]),
    TOTAL: 0,
    LID: faker.helpers.arrayElement(['No', 'Yes']),
    GROSS_ACRE: faker.number.float({ min: 0.2, max: 4.8, fractionDigits: 2 }),
    NET_ACRE: faker.number.float({ min: 0.2, max: 4.8, fractionDigits: 2 }),
    DISTRICT: faker.helpers.arrayElement(districts),
    PRECINCT: `${pad(faker.number.int({ min: 1, max: 99 }), 2)}-${pad(faker.number.int({ min: 1, max: 999 }), 3)}`,
    FIRE_AREA: faker.helpers.arrayElement(fireAreas),
    ROAD_AREA: faker.helpers.arrayElement(roadAreas),
    LAST_UPDATED: formatIsoWithTenths(
      faker.date.between({
        from: '2025-01-01T00:00:00.000Z',
        to: '2026-03-31T23:59:59.999Z',
      }),
    ),
    APPRAISALS: appraisals,
    ASSESSMENTS: assessments,
    TAX_BILLING: taxBilling,
    RECORDED_DOCUMENTS: createRecordedDocuments(),
    STRUCTURES: createStructures(),
    BUILDING_DETAILS: createBuildingDetails(),
  };
}

function normalizeCount(count?: number) {
  if (typeof count !== 'number' || Number.isNaN(count)) {
    return DEFAULT_PARCEL_COUNT;
  }

  return Math.max(1, Math.min(MAX_PARCEL_COUNT, Math.floor(count)));
}

function normalizeSeed(seed?: number) {
  if (typeof seed !== 'number' || Number.isNaN(seed)) {
    return DEFAULT_PARCEL_SEED;
  }

  return Math.floor(seed);
}

const parcelsCache = new Map<string, ParcelDetails[]>();

export function getMockParcels(options: ParcelGeneratorOptions = {}) {
  const count = normalizeCount(options.count);
  const seed = normalizeSeed(options.seed);
  const cacheKey = `${seed}:${count}`;

  const cached = parcelsCache.get(cacheKey);
  if (cached) {
    return cached;
  }

  faker.seed(seed);

  const generated = Array.from({ length: count }, (_, index) =>
    createParcel(index),
  );

  parcelsCache.set(cacheKey, generated);
  return generated;
}

export const mockParcels: ParcelDetails[] = getMockParcels();

export function getParcelById(
  parcelId: string,
  options: ParcelGeneratorOptions = {},
) {
  return getMockParcels(options).find(
    (parcel) => parcel.PARCEL_ID === parcelId,
  );
}
