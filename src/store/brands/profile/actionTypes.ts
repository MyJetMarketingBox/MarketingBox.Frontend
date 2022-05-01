export enum BrandProfileTypes {
  /** GET **/
  GET_BRAND_PROFILE = "@@brands/profile/GET_BRAND_PROFILE",
  GET_BRAND_PROFILE_SUCCESS = "@@brands/profile/GET_BRAND_PROFILE_SUCCESS",
  GET_BRAND_PROFILE_FAIL = "@@brands/profile/GET_BRAND_PROFILE_FAIL",

  /** UPDATE **/
  UPDATE_BRAND_PROFILE = "@@brands/profile/UPDATE_BRAND_PROFILE",
  UPDATE_BRAND_PROFILE_SUCCESS = "@@brands/profile/UPDATE_BRAND_PROFILE_SUCCESS",
  UPDATE_BRAND_PROFILE_FAIL = "@@brands/profile/UPDATE_BRAND_PROFILE_FAIL",

  /** CLEAR **/
  CLEAR_BRAND_PROFILE = "@brands/profile/CLEAR_BRAND_PROFILE",
}

export interface BrandProfileState {
  brand: Object;
  error: Object;
  loading: boolean;
  loaded: boolean;
  upLoading: boolean;
  upLoaded: boolean;
}