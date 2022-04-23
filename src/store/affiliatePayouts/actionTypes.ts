export enum AffPayoutsTypes {
  /** GET **/
  GET_AFF_PAYOUTS = '@@affiliatePayouts/GET_AFF_PAYOUTS',
  GET_AFF_PAYOUTS_SUCCESS = '@@affiliatePayouts/GET_AFF_PAYOUTS_SUCCESS',
  GET_AFF_PAYOUTS_FAIL = '@@affiliatePayouts/GET_AFF_PAYOUTS_FAIL',

  /** ADD **/
  ADD_AFF_PAYOUTS = '@@affiliatePayouts/ADD_AFF_PAYOUTS',
  ADD_AFF_PAYOUTS_SUCCESS = '@@affiliatePayouts/ADD_AFF_PAYOUTS_SUCCESS',
  ADD_AFF_PAYOUTS_FAIL = '@@affiliatePayouts/ADD_AFF_PAYOUTS_FAIL',


  /** CLEAR **/
  CLEAR_AFF_PAYOUTS = '@@affiliates/CLEAR_AFF_PAYOUTS',
}

interface iAffPayout {
  affiliateId: string
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
}