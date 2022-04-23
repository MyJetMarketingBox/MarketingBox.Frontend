export enum AffProfileTypes {

  /** AFFILIATE PROFILE **/
  GET_AFFILIATE_PROFILE = '@@affiliates/profile/GET_AFFILIATE_PROFILE',
  GET_AFFILIATE_PROFILE_SUCCESS = '@@affiliates/profile/GET_AFFILIATE_PROFILE_SUCCESS',
  GET_AFFILIATE_PROFILE_FAIL = '@@affiliates/profile/GET_AFFILIATE_PROFILE_FAIL',

  /* CLEAR AFFILIATE PROFILE*/
  CLEAR_AFFILIATE_PROFILE = '@affiliates/profile/CLEAR_AFFILIATE'
}

export interface AffProfileState {
  affProfile: Object;
  error: Object;
  loading: boolean;
  loaded: boolean;
}
