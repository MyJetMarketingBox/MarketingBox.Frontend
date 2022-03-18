import {BrandsTypes} from "./actionTypes";

export const getBrands = (nextUrl: any, filter: object) => ({
  type: BrandsTypes.GET_BRANDS,
  nextUrl,
  filter
})

export const getBrandsSuccess = (brands : any) => ({
  type: BrandsTypes.GET_BRANDS_SUCCESS,
  payload: brands,
})

export const getBrandsFail = (error : any) => ({
  type: BrandsTypes.GET_BRANDS_FAIL,
  payload: error,
})

export const updateBrand = (brand: object, id: number) => {
  return {
    type: BrandsTypes.UPDATE_BRAND,
    payload: brand,
    id: id
  }
}

export const updateBrandSuccess = (brand: object) => ({
  type: BrandsTypes.UPDATE_BRAND_SUCCESS,
  payload: brand
})

export const updateBrandFail = (error: any) => ({
  type: BrandsTypes.UPDATE_BRAND_FAIL,
  payload: error
})

export const clearBrands = () => ({
  type: BrandsTypes.CLEAR_BRANDS,
})