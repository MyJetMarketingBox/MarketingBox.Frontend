export enum AffProfileTypes {

  /** AFFILIATE PROFILE **/
  GET_AFFILIATE_PROFILE = '@@affiliates/profile/GET_AFFILIATE_PROFILE',
  GET_AFFILIATE_PROFILE_SUCCESS = '@@affiliates/profile/GET_AFFILIATE_PROFILE_SUCCESS',
  GET_AFFILIATE_PROFILE_FAIL = '@@affiliates/profile/GET_AFFILIATE_PROFILE_FAIL',

  /* Edit AFFILIATE */
  UPDATE_AFFILIATE = '@@affiliates/profile/UPDATE_AFFILIATE',
  UPDATE_AFFILIATE_SUCCESS = '@@affiliates/profile/UPDATE_AFFILIATE_SUCCESS',
  UPDATE_AFFILIATE_FAIL = '@@affiliates/profile/UPDATE_AFFILIATE_FAIL',

  /* CLEAR AFFILIATE PROFILE*/
  CLEAR_AFFILIATE_PROFILE = '@affiliates/profile/CLEAR_AFFILIATE'
}

export interface AffProfileState {
  affProfile: Object;
  error: Object;
  loading: boolean;
  loaded: boolean;
  upLoading: boolean;
  upLoaded: boolean;
}
