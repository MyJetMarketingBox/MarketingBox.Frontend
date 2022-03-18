export enum BrandsTypes {
  /** GET BRANDS **/
  GET_BRANDS = '@@brands/GET_BRANDS',
  GET_BRANDS_SUCCESS = '@@brands/GET_BRANDS_SUCCESS',
  GET_BRANDS_FAIL = '@@brands/GET_BRANDS_FAIL',

  /** CLEAR BRANDS */
  CLEAR_BRANDS = '@@contact/CLEAR_BRANDS',

  /** UPDATE BRAND */
  UPDATE_BRAND = '@@contact/UPDATE_BRAND',
  UPDATE_BRAND_SUCCESS = '@@contact/UPDATE_BRAND_SUCCESS',
  UPDATE_BRAND_FAIL = '@@contact/UPDATE_BRAND_FAIL',
}

interface iBrands {
  items  : Array<Object>;
  pagination : Object;
}

export interface BrandsState {
  brands: iBrands,
  brand: Object,
  error: Object,
  loading: boolean;
  addBrandsLoading: boolean;
  addBrandsSuccess: boolean;
  addBrandsError: boolean;
  loaded: boolean;
  success: boolean;
}
