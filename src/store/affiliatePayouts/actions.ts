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

/** ADD AFF PAYOUTS **/
export const addAffPayouts = (affPayouts: any, affiliate: any) => ({
  type: AffPayoutsTypes.ADD_AFF_PAYOUTS,
  affPayouts,
  affiliate
})

export const addAffPayoutsSuccess = (data: any) => ({
  type: AffPayoutsTypes.ADD_AFF_PAYOUTS_SUCCESS,
  payload: data
})

export const addAffPayoutsFail = (error: any) => ({
  type: AffPayoutsTypes.ADD_AFF_PAYOUTS_FAIL,
  payload: error
})

/** ADD PAYOUT **/
export const addPayout = (data: any) => ({
  type: AffPayoutsTypes.ADD_PAYOUT,
  payload: data
})

export const addPayoutSuccess = (data: any) => ({
  type: AffPayoutsTypes.ADD_PAYOUT_SUCCESS,
  payload: data
})

export const addPayoutFail = (error: any) => ({
  type: AffPayoutsTypes.ADD_PAYOUT_FAIL,
  payload: error
})

/** UPDATE PAYOUT **/
export const updatePayout = (data: any, id: number) => ({
  type: AffPayoutsTypes.UPDATE_PAYOUT,
  data,
  id
})

export const updatePayoutSuccess = (data: any) => ({
  type: AffPayoutsTypes.UPDATE_PAYOUT_SUCCESS,
  payload: data
})

export const updatePayoutFail = (error: any) => ({
  type: AffPayoutsTypes.UPDATE_PAYOUT_FAIL,
  payload: error
})


/** DEL PAYOUT **/

export const delPayout = (id: number) => ({
  type: AffPayoutsTypes.DELETE_PAYOUT,
  payload: id
})

export const delPayoutSuccess = (response: any) => ({
  type: AffPayoutsTypes.DELETE_PAYOUT_SUCCESS,
  payload: response
})

export const delPayoutFail = (error: any) => ({
  type: AffPayoutsTypes.DELETE_PAYOUT_FAIL,
  payload: error
})

/** CLEAR **/
export const clearAffPayouts = () => ({
  type: AffPayoutsTypes.CLEAR_AFF_PAYOUTS
})