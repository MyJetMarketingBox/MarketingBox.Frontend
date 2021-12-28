export enum AffiliatesTypes {
  /** Get affiliates */
  GET_AFFILIATES = '@@affiliates/GET_AFFILIATES',
  GET_AFFILIATES_SUCCESS = '@@affiliates/GET_AFFILIATES_SUCCESS',
  GET_AFFILIATES_FAIL = '@@affiliates/GET_AFFILIATES_FAIL',

  /* AFFILIATE PROFILE */
  GET_AFFILIATE_PROFILE = '@@contact/GET_AFFILIATE_PROFILE',
  GET_AFFILIATE_PROFILE_SUCCESS = '@@contact/GET_AFFILIATE_PROFILE_SUCCESS',
  GET_AFFILIATE_PROFILE_FAIL = '@@contact/GET_AFFILIATE_PROFILE_FAIL',
}

export interface AffiliatesState {
  affiliates  : Array<any>;
  affiliateProfile : Object;
  error : Object;
}