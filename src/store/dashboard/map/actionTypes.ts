export enum DashMapTypes {
  /** GET **/
  GET_DASH_MAP = "@@dashMap/GET_DASH_MAP",
  GET_DASH_MAP_SUCCESS = "@@dashMap/GET_DASH_MAP_SUCCESS",
  GET_DASH_MAP_FAIL = "@@dashMap/GET_DASH_MAP_FAIL",

  /** CLEAR **/
  CLEAR_DASH_MAP = "@@dashMap/CLEAR_DASH_MAP"
}

interface ICountries {
  "countryId": number,
  "alpha2Code": string,
  "registrationsCount": number,
  "ftdCount": number,
  "failedCount": number,
  "cr": number
}

export interface DashMapState {
  countries: ICountries[];
  loading: boolean;
  loaded: boolean;
  error: Object;
}