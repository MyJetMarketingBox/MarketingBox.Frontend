import {AffPayoutsTypes} from './actionTypes'

/** GET **/
export const getAffPayouts = (nextUrl: any, filter: object) => ({
  type: AffPayoutsTypes.GET_AFF_PAYOUTS,
  nextUrl,
  filter
})

export const getAffPayoutsSuccess = (data: any) => ({
  type: AffPayoutsTypes.GET_AFF_PAYOUTS_SUCCESS,
  payload: data
})

export const getAffPayoutsFail = (error : any) => ({
  type: AffPayoutsTypes.GET_AFF_PAYOUTS_FAIL,
  payload: error
})

/** ADD **/
export const addAffPayouts = (data: any) => ({
  type: AffPayoutsTypes.ADD_AFF_PAYOUTS,
  payload: data
})

export const addAffPayoutsSuccess = (data: any) => ({
  type: AffPayoutsTypes.ADD_AFF_PAYOUTS_SUCCESS,
  payload: data
})

export const addAffPayoutsFail = (error: any) => ({
  type: AffPayoutsTypes.ADD_AFF_PAYOUTS_FAIL,
  payload: error
})

/** CLEAR **/
export const clearAffPayouts = () => ({
  type: AffPayoutsTypes.CLEAR_AFF_PAYOUTS
})