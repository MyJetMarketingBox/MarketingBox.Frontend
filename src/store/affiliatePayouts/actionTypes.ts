export enum AffPayoutsTypes {
  /** GET **/
  GET_AFF_PAYOUTS = '@@affiliatePayouts/GET_AFF_PAYOUTS',
  GET_AFF_PAYOUTS_SUCCESS = '@@affiliatePayouts/GET_AFF_PAYOUTS_SUCCESS',
  GET_AFF_PAYOUTS_FAIL = '@@affiliatePayouts/GET_AFF_PAYOUTS_FAIL',

  /** ADD AFF PAYOUTS **/
  ADD_AFF_PAYOUTS = '@@affiliatePayouts/ADD_AFF_PAYOUTS',
  ADD_AFF_PAYOUTS_SUCCESS = '@@affiliatePayouts/ADD_AFF_PAYOUTS_SUCCESS',
  ADD_AFF_PAYOUTS_FAIL = '@@affiliatePayouts/ADD_AFF_PAYOUTS_FAIL',

  /** ADD PAYOUT **/
  ADD_PAYOUT = '@@affiliatePayouts/ADD_PAYOUTS',
  ADD_PAYOUT_SUCCESS = '@@affiliatePayouts/ADD_PAYOUTS_SUCCESS',
  ADD_PAYOUT_FAIL = '@@affiliatePayouts/ADD_PAYOUTS_FAIL',

  /** UPDATE **/
  UPDATE_PAYOUT = '@@affiliatePayouts/UPDATE_PAYOUT',
  UPDATE_PAYOUT_SUCCESS = '@@affiliatePayouts/UPDATE_PAYOUT_SUCCESS',
  UPDATE_PAYOUT_FAIL = '@@affiliatePayouts/UPDATE_PAYOUT_FAIL',

  /** DELETE **/
  DELETE_PAYOUT = '@@affiliatePayouts/DELETE_PAYOUT',
  DELETE_PAYOUT_SUCCESS = '@@affiliatePayouts/DELETE_PAYOUT_SUCCESS',
  DELETE_PAYOUT_FAIL = '@@affiliatePayouts/DELETE_PAYOUT_FAIL',

  /** CLEAR **/
  CLEAR_AFF_PAYOUTS = '@@affiliates/CLEAR_AFF_PAYOUTS',
}

interface iAffPayout {
  id: string
}

interface iAffPayouts {
  items  : Array<iAffPayout>;
  pagination : Object;
}

export interface AffPayoutsState {
  affPayouts  : iAffPayouts;
  error : Object;
  loadingList: boolean;
  loadedList: boolean;
  loadingItem: boolean;
  loadedItem: boolean;
  errorUpdate: Object,
  loadingUpdate: boolean,
  loadedUpdate: boolean,
  loadingDel: boolean,
  loadedDel: boolean
}