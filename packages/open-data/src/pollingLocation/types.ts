import { ESRIResponse } from '../types';

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

export type PollingLocationResponse = ESRIResponse<PollingLocationFeature>;
