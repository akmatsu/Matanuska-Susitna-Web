import { ESRIResponse } from '../types';

export interface PrecinctFeature {
  attributes: {
    DISTRICT: string;
    NAME: string;
    DIST_NAME: string;
  };
}

export type PrecinctResponse = ESRIResponse<PrecinctFeature>;
