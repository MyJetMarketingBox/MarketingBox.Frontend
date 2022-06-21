export enum BrandsTypes {
  /** GET BRANDS **/
  GET_BRANDS = '@@brands/GET_BRANDS',
  GET_BRANDS_SUCCESS = '@@brands/GET_BRANDS_SUCCESS',
  GET_BRANDS_FAIL = '@@brands/GET_BRANDS_FAIL',

  /** CLEAR BRANDS */
  CLEAR_BRANDS = '@@brand/CLEAR_BRANDS',

  /** ADD **/
  ADD_BRAND = "@@brand/ADD_BRAND",
  ADD_BRAND_SUCCESS = "@@brand/ADD_BRAND_SUCCESS",
  ADD_BRAND_FAIL = "@@brand/ADD_BRAND_FAIL",

  /** DEL **/
  DEL_BRAND = '@@brand/DEL_BRAND',
  DEL_BRAND_SUCCESS = '@@brand/DEL_BRAND_SUCCESS',
  DEL_BRAND_FAIL = '@@brand/DEL_BRAND_FAIL',

}

interface iBrand {
  id: number;
  name: string;
}

interface iBrands {
  items  : Array<iBrand>;
  pagination : Object;
}

export interface BrandsState {
  brands: iBrands,
  error: Object,
  loading: boolean;
  loaded: boolean;
  addBrandsLoading: boolean;
  addBrandsLoaded: boolean;
}
