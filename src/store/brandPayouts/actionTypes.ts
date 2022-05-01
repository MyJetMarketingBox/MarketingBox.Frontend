export enum BrandPayoutsType {
  /** GET **/
  GET_BRAND_PAYOUTS = '@@brandPayouts/GET_BRAND_PAYOUTS',
  GET_BRAND_PAYOUTS_SUCCESS = '@@brandPayouts/GET_BRAND_PAYOUTS_SUCCESS',
  GET_BRAND_PAYOUTS_FAIL = '@@brandPayouts/GET_BRAND_PAYOUTS_FAIL',

  /** ADD BRAND PAYOUTS **/
  ADD_BRAND_PAYOUTS = '@@brandPayouts/ADD_BRAND_PAYOUTS',
  ADD_BRAND_PAYOUTS_SUCCESS = '@@brandPayouts/ADD_BRAND_PAYOUTS_SUCCESS',
  ADD_BRAND_PAYOUTS_FAIL = '@@brandPayouts/ADD_BRAND_PAYOUTS_FAIL',

  /** ADD PAYOUTS **/
  ADD_PAYOUTS = '@@brandPayouts/ADD_PAYOUTS',
  ADD_PAYOUTS_SUCCESS = '@@brandPayouts/ADD_PAYOUTS_SUCCESS',
  ADD_PAYOUTS_FAIL = '@@brandPayouts/ADD_PAYOUTS_FAIL',

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
}