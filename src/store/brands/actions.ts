import { BrandsTypes } from "./actionTypes";

export const getBrands = (nextUrl?: any, filter?: object) => ({
  type: BrandsTypes.GET_BRANDS,
  nextUrl,
  filter,
});

export const getBrandsSuccess = (brands: any) => ({
  type: BrandsTypes.GET_BRANDS_SUCCESS,
  payload: brands,
});

export const getBrandsFail = (error: any) => ({
  type: BrandsTypes.GET_BRANDS_FAIL,
  payload: error,
});

export const addBrand = (brand: any, history: any) => ({
  type: BrandsTypes.ADD_BRAND,
  payload: brand,
  history,
});

export const addBrandSuccess = (brand: any) => ({
  type: BrandsTypes.ADD_BRAND_SUCCESS,
  payload: brand,
});

export const addBrandFail = (error: any) => ({
  type: BrandsTypes.ADD_BRAND,
  payload: error,
});

export const delBrand = (id: number) => ({
  type: BrandsTypes.DEL_BRAND,
  payload: id,
});

export const delBrandSuccess = (brand: any) => ({
  type: BrandsTypes.DEL_BRAND_SUCCESS,
  payload: brand,
});

export const delBrandFail = (error: any) => ({
  type: BrandsTypes.DEL_BRAND_FAIL,
  payload: error,
});

export const clearBrands = () => ({
  type: BrandsTypes.CLEAR_BRANDS,
});
