export enum AffiliatesTypes {
  /** Get affiliates */
  GET_AFFILIATES = '@@affiliates/GET_AFFILIATES',
  GET_AFFILIATES_SUCCESS = '@@affiliates/GET_AFFILIATES_SUCCESS',
  GET_AFFILIATES_FAIL = '@@affiliates/GET_AFFILIATES_FAIL',

  /* AFFILIATE PROFILE */
  GET_AFFILIATE_PROFILE = '@@contact/GET_AFFILIATE_PROFILE',
  GET_AFFILIATE_PROFILE_SUCCESS = '@@contact/GET_AFFILIATE_PROFILE_SUCCESS',
  GET_AFFILIATE_PROFILE_FAIL = '@@contact/GET_AFFILIATE_PROFILE_FAIL',

  /* ADD AFFILIATE */
  ADD_NEW_AFFILIATE = '@@contact/ADD_NEW_AFFILIATE',
  ADD_AFFILIATE_START = '@@contact/ADD_AFFILIATE_START',
  ADD_AFFILIATE_SUCCESS = '@@contact/ADD_AFFILIATE_SUCCESS',
  ADD_AFFILIATE_FAIL = '@@contact/ADD_AFFILIATE_FAIL',

  /* DELETE AFFILIATE */
  DELETE_AFFILIATE = '@@contact/DELETE_AFFILIATE',
  DELETE_AFFILIATE_SUCCESS = '@@contact/DELETE_AFFILIATE_SUCCESS',
  DELETE_AFFILIATE_FAIL = '@@contact/DELETE_AFFILIATE_FAIL',
}

interface iAffiliate {
  affiliateId: string
}

interface iAffiliates {
  items  : Array<iAffiliate>;
  pagination : Object;
}

export interface AffiliatesState {
  affiliates  : iAffiliates;
  affiliateProfile : Object;
  error : Object;
  loading: boolean;
}
