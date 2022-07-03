import {BrandProfileTypes} from "./actionTypes";

export const getBrand = (id: number) => ({
  type: BrandProfileTypes.GET_BRAND_PROFILE,
  id
})

export const getBrandSuccess = (brand : any) => ({
  type: BrandProfileTypes.GET_BRAND_PROFILE_SUCCESS,
  payload: brand
})

export const getBrandFail = (error : any) => ({
  type: BrandProfileTypes.GET_BRAND_PROFILE_FAIL,
  payload: error
})

export const updateBrand = (brand : any, id : number) => ({
  type: BrandProfileTypes.UPDATE_BRAND_PROFILE,
  payload: brand,
  id: id
})

export const updateBrandSuccess = (brand : any) => ({
  type: BrandProfileTypes.UPDATE_BRAND_PROFILE_SUCCESS,
  payload: brand,
})

export const updateBrandFail = (error : any) => ({
  type: BrandProfileTypes.UPDATE_BRAND_PROFILE_FAIL,
  payload: error,
})

export const clearBrand = () => ({
  type: BrandProfileTypes.CLEAR_BRAND_PROFILE
})

export const modalAssignPayoutBrand = (status: boolean) => ({
  type: BrandProfileTypes.MODAL_ASSIGN_PAYOUT,
  status
});

export const modalNewPayoutBrand = (status: boolean) => ({
  type: BrandProfileTypes.MODAL_NEW_PAYOUT,
  status
});