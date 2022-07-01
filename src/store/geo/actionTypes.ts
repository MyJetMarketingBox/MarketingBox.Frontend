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

  /** UPDATE **/
  UPDATE_GEO = "@@geo/UPDATE_GEO",
  UPDATE_GEO_SUCCESS = "@@geo/UPDATE_GEO_SUCCESS",
  UPDATE_GEO_FAIL = "@@geo/UPDATE_GEO_FAIL",

  /** DEL **/
  DEL_GEO = "@@geo/DEL_GEO",
  DEL_GEO_SUCCESS = "@@geo/DEL_GEO_SUCCESS",
  DEL_GEO_FAIL = "@@geo/DEL_GEO_FAIL",

  /** CLEAR **/
  CLEAR_GEO = "@@geo/CLEAR_GEO",

  /** MODAL **/
  MODAL_SHOW = "@@geo/MODAL_SHOW",
  MODAL_HIDE = "@@geo/MODAL_HIDE",
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

interface ICampaignItem {
  "campaignId": number;
  "campaignName": string;
  "amount": number;
}

interface IDelete {
  items: ICampaignItem[];
  isOk: boolean;
  modal: boolean;
}

export interface GeoState {
  geo: IGeo;
  delete: IDelete;
  error: Object;
  loading: boolean;
  loaded: boolean;
  addLoading: boolean;
  addLoaded: boolean;
  profile: Object;
  loadingProfile: boolean;
  loadedProfile: boolean;
}
