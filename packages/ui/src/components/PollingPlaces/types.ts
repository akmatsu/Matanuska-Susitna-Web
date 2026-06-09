export type PollingLocationFeature = {
  attributes: {
    DISTRICT: string;
    NAME: string;
    ADDRESS: string;
    POLLING_PL: string;
    OBJECTID: number;
    DIST_NAME: string;
    PrecinctMap: string;
    PollingLocationMap: string;
    AssemblyDistrict: number;
  };
  geometry: {
    x: number;
    y: number;
  };
};

export type PollingLocationResponse = {
  features: PollingLocationFeature[];
  error?: {
    code?: number;
    message?: string;
  };
};

export type AddressFeature = {
  attributes: {
    OBJECTID: number;
    ADDRESS: string;
    COMMUNITY: string;
    stateabbreviation: string;
  };
  geometry: {
    x: number;
    y: number;
  };
};

export type AddressSearchResponse = {
  features: AddressFeature[];
  error?: {
    code?: number;
    message?: string;
  };
};

export type PrecinctFeature = {
  attributes: {
    DISTRICT: string;
    NAME: string;
    DIST_NAME: string;
  };
};

export type PrecinctResponse = {
  features: PrecinctFeature[];
  error?: {
    code?: number;
    message?: string;
  };
};
