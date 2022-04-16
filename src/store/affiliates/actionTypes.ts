export enum AffiliatesTypes {
  /** Get affiliates */
  GET_AFFILIATES = '@@affiliates/GET_AFFILIATES',
  GET_AFFILIATES_SUCCESS = '@@affiliates/GET_AFFILIATES_SUCCESS',
  GET_AFFILIATES_FAIL = '@@affiliates/GET_AFFILIATES_FAIL',

  /* AFFILIATE PROFILE */
  GET_AFFILIATE_PROFILE = '@@affiliates/GET_AFFILIATE_PROFILE',
  GET_AFFILIATE_PROFILE_SUCCESS = '@@affiliates/GET_AFFILIATE_PROFILE_SUCCESS',
  GET_AFFILIATE_PROFILE_FAIL = '@@affiliates/GET_AFFILIATE_PROFILE_FAIL',

  /* ADD AFFILIATE */
  ADD_NEW_AFFILIATE = '@@affiliates/ADD_NEW_AFFILIATE',
  ADD_AFFILIATE_SUCCESS = '@@affiliates/ADD_AFFILIATE_SUCCESS',
  ADD_AFFILIATE_FAIL = '@@affiliates/ADD_AFFILIATE_FAIL',

  /* Edit AFFILIATE */
  UPDATE_AFFILIATE = '@@affiliates/UPDATE_AFFILIATE',
  UPDATE_AFFILIATE_SUCCESS = '@@affiliates/UPDATE_AFFILIATE_SUCCESS',
  UPDATE_AFFILIATE_FAIL = '@@affiliates/UPDATE_AFFILIATE_FAIL',

  /* DELETE AFFILIATE */
  DELETE_AFFILIATE = '@@affiliates/DELETE_AFFILIATE',
  DELETE_AFFILIATE_SUCCESS = '@@affiliates/DELETE_AFFILIATE_SUCCESS',
  DELETE_AFFILIATE_FAIL = '@@affiliates/DELETE_AFFILIATE_FAIL',

  /* CLEAR AFFILIATE */
  CLEAR_AFFILIATE = '@@affiliates/CLEAR_AFFILIATE',
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
  addAffLoading: boolean;
  addAffSuccess: boolean;
  addAffError: boolean;
  loaded: boolean;
  success: boolean;
}
