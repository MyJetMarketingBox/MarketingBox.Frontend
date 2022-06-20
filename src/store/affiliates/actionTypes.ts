import { PaginationType } from "src/types/PaginationType";
export enum AffiliatesTypes {
  /** Get affiliates */
  GET_AFFILIATES = "@@affiliates/GET_AFFILIATES",
  GET_AFFILIATES_SUCCESS = "@@affiliates/GET_AFFILIATES_SUCCESS",
  GET_AFFILIATES_FAIL = "@@affiliates/GET_AFFILIATES_FAIL",

  /* ADD AFFILIATE */
  ADD_NEW_AFFILIATE = "@@affiliates/ADD_NEW_AFFILIATE",
  ADD_AFFILIATE_SUCCESS = "@@affiliates/ADD_AFFILIATE_SUCCESS",
  ADD_AFFILIATE_FAIL = "@@affiliates/ADD_AFFILIATE_FAIL",

  /* DELETE AFFILIATE */
  DELETE_AFFILIATE = "@@affiliates/DELETE_AFFILIATE",
  DELETE_AFFILIATE_SUCCESS = "@@affiliates/DELETE_AFFILIATE_SUCCESS",
  DELETE_AFFILIATE_FAIL = "@@affiliates/DELETE_AFFILIATE_FAIL",

  /* CLEAR AFFILIATE */
  CLEAR_AFFILIATE = "@@affiliates/CLEAR_AFFILIATE",
  CLEAR_AFFILIATE_ERROR = "@@affiliates/CLEAR_AFFILIATE_ERROR",
}

interface iAffiliate {
  affiliateId: string;
}

interface iAffiliates {
  items: Array<iAffiliate>;
  pagination: PaginationType | null;
}

export interface AffiliatesState {
  affiliates: iAffiliates;
  error: any;
  loading: boolean;
  addAffLoading: boolean;
  addAffSuccess: boolean;
  addAffError: boolean;
  loaded: boolean;
  success: boolean;
}
