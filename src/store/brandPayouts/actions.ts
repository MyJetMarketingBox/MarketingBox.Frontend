import {BrandPayoutsType} from "./actionTypes";

/** GET **/
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


/** ADD BRAND PAYOUT **/
export const addBrandPayout = (brandPayout: any, brand: any) => ({
  type: BrandPayoutsType.ADD_BRAND_PAYOUT,
  brandPayout,
  brand
})

export const addBrandPayoutSuccess = (data: any) => ({
  type: BrandPayoutsType.ADD_BRAND_PAYOUT_SUCCESS,
  payload: data
})

export const addBrandPayoutFail = (error: any) => ({
  type: BrandPayoutsType.ADD_BRAND_PAYOUT_FAIL,
  payload: error
})


/** ADD PAYOUT **/
export const addBPayout = (data: any) => ({
  type: BrandPayoutsType.ADD_PAYOUT,
  payload: data
})

export const addBPayoutSuccess = (data: any) => ({
  type: BrandPayoutsType.ADD_PAYOUT_SUCCESS,
  payload: data
})

export const addBPayoutFail = (error: any) => ({
  type: BrandPayoutsType.ADD_PAYOUT_FAIL,
  payload: error
})

/** CLEAR **/
export const clearBrandPayouts = () => ({
  type: BrandPayoutsType.CLEAR_BRAND_PAYOUTS
})