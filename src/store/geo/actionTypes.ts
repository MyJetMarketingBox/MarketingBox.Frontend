export enum GeoTypes {
  /** GET **/
  GET_GEO = "@geo/GET_GEO",
  GET_GEO_SUCCESS = "@geo/GET_GEO_SUCCESS",
  GET_GEO_FAIL = "@geo/GET_GEO_FAIL",

  GET_GEO_PROFILE = "@@geo/GET_GEO_PROFILE",
  GET_GEO_PROFILE_SUCCESS = "@@geo/GET_GEO_PROFILE_SUCCESS",
  GET_GEO_PROFILE_FAIL = "@@geo/GET_GEO_PROFILE_FAIL",

  /** ADD **/
  ADD_GEO = "@geo/ADD_GEO",
  ADD_GEO_SUCCESS = "@geo/ADD_GEO_SUCCESS",
  ADD_GEO_FAIL = "@geo/ADD_GEO_FAIL",

  /** CLEAR **/
  CLEAR_GEO = "@@geo/CLEAR_GEO",
}

export interface IGeoItem {
  id: number;
  createdAt: string;
  name: string;
  countryIds: number[];
}

interface IGeo {
  items: IGeoItem[];
  pagination: Object;
}

export interface GeoState {
  geo: IGeo;
  error: Object;
  loading: boolean;
  loaded: boolean;
  addLoading: boolean;
  addLoaded: boolean;
  profile: Object;
  loadingProfile: boolean;
  loadedProfile: boolean;
}
