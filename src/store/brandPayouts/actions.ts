import {BrandPayoutsType} from "./actionTypes";

export const getBrandPayouts = (nextUrl: any, filter: object) => ({
  type: BrandPayoutsType.GET_BRAND_PAYOUTS,
  nextUrl,
  filter
})

export const getBrandPayoutsSuccess = (data : any) => ({
  type: BrandPayoutsType.GET_BRAND_PAYOUTS_SUCCESS,
  payload: data
})

export const getBrandPayoutsFail = (error : any) => ({
  type: BrandPayoutsType.GET_BRAND_PAYOUTS_FAIL,
  payload: error
})