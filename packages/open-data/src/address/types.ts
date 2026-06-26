import { ESRIResponse } from '../types';

export interface AddressFeature {
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
}

export type AddressSearchResponse = ESRIResponse<AddressFeature>;
