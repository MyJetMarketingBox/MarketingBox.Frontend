export enum BrandPayoutsType {
  /** GET **/
  GET_BRAND_PAYOUTS = '@@brandPayouts/GET_BRAND_PAYOUTS',
  GET_BRAND_PAYOUTS_SUCCESS = '@@brandPayouts/GET_BRAND_PAYOUTS_SUCCESS',
  GET_BRAND_PAYOUTS_FAIL = '@@brandPayouts/GET_BRAND_PAYOUTS_FAIL',

  /** ADD BRAND PAYOUT **/
  ADD_BRAND_PAYOUT = '@@brandPayouts/ADD_BRAND_PAYOUTS',
  ADD_BRAND_PAYOUT_SUCCESS = '@@brandPayouts/ADD_BRAND_PAYOUTS_SUCCESS',
  ADD_BRAND_PAYOUT_FAIL = '@@brandPayouts/ADD_BRAND_PAYOUTS_FAIL',

  /** ADD PAYOUT **/
  ADD_PAYOUT = '@@brandPayouts/ADD_PAYOUTS',
  ADD_PAYOUT_SUCCESS = '@@brandPayouts/ADD_PAYOUTS_SUCCESS',
  ADD_PAYOUT_FAIL = '@@brandPayouts/ADD_PAYOUTS_FAIL',

  /** UPDATE PAYOUT **/
  UPDATE_PAYOUT = '@@brandPayouts/UPDATE_PAYOUTS',
  UPDATE_PAYOUT_SUCCESS = '@@brandPayouts/UPDATE_PAYOUTS_SUCCESS',
  UPDATE_PAYOUT_FAIL = '@@brandPayouts/UPDATE_PAYOUTS_FAIL',

  /** DEL PAYOUT **/
  DEL_PAYOUT = '@@brandPayouts/DEL_PAYOUTS',
  DEL_PAYOUT_SUCCESS = '@@brandPayouts/DEL_PAYOUTS_SUCCESS',
  DEL_PAYOUT_FAIL = '@@brandPayouts/DEL_PAYOUTS_FAIL',

  /** CLEAR **/
  CLEAR_BRAND_PAYOUTS = '@@affiliates/CLEAR_BRAND_PAYOUTS',

}

interface iBrandPayout {
  id: number
}

interface iBrandPayouts {
  items  : Array<iBrandPayout>;
  pagination : Object;
}

export interface BrandPayoutsState {
  brandPayouts  : iBrandPayouts;
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